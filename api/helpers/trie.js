// Trie.js - super simple JS implementation
// https://en.wikipedia.org/wiki/Trie
// From https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0
// Modified by David R Jimenez M - 2021 - Feb

// -----------------------------------------

// we start with the TrieNode
var generalData = {};
function TrieNode(key) {
    // the "key" value will be the character in sequence
    this.key = key;

    // we keep a reference to parent
    this.parent = null;

    // we have hash of children
    this.children = {};

    // check to see if the node is at the end
    this.end = false;
}

// iterates through the parents to get the word.
// time complexity: O(k), k = word length
TrieNode.prototype.getWord = function () {
    let output = [];
    let node = this;

    while (node !== null) {
        output.unshift(node.key);
        node = node.parent;
    }

    return output.join('');
};

// -----------------------------------------

// we implement Trie with just a simple root with null value.
function Trie() {
    this.root = new TrieNode(null);
}

// Load data to general var
Trie.prototype.loadData = function (gD) {
    generalData = gD;
}

// inserts a word into the trie.
// time complexity: O(k), k = word length
Trie.prototype.insert = function (word) {
    let node = this.root; // we start at the root 😬

    // for every character in the word
    for (let i = 0; i < word.length; i++) {
        // check to see if character node exists in children.
        if (!node.children[word[i]]) {
            // if it doesn't exist, we then create it.
            node.children[word[i]] = new TrieNode(word[i]);

            // we also assign the parent to the child node.
            node.children[word[i]].parent = node;
        }

        // proceed to the next depth in the trie.
        node = node.children[word[i]];

        // finally, we check to see if it's the last word.
        if (i == word.length - 1) {
            // if it is, we set the end flag to true.
            node.end = true;
        }
    }
};

// check if it contains a whole word.
// time complexity: O(k), k = word length
Trie.prototype.contains = function (word) {
    let node = this.root;

    // for every character in the word
    for (let i = 0; i < word.length; i++) {
        // check to see if character node exists in children.
        if (node.children[word[i]]) {
            // if it exists, proceed to the next depth of the trie.
            node = node.children[word[i]];
        } else {
            // doesn't exist, return false since it's not a valid word.
            return false;
        }
    }

    // we finished going through all the words, but is it a whole word?
    return node.end;
};

// returns every word with given prefix
// time complexity: O(p + n), p = prefix length, n = number of child paths
Trie.prototype.find = function (prefix) {
    var node = this.root;
    var output = [];
    if (prefix) {
        // for every character in the prefix
        for (var i = 0; i < prefix.length; i++) {
            // make sure prefix actually has words
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            } else {
                // there's none. just return it.
                return output;
            }
        }
    }

    // recursively find all words in the node
    findAllWords(node, output);
    return output;
};

// Order the array machting whit the search word and also by times field.
Trie.prototype.orderOutput = function (prefix, output) {
    let result = [];
    let firstItems = [];
    let tempArray = [];
    const suggestNum = process.env.SUGGESTION_NUMBER;

    if (output) {
        output = output.sort();
        const findPrefix = output.indexOf(prefix);
        if (findPrefix > -1) {
            const dataTime = findTime(output[findPrefix])
            if (dataTime) {
                firstItems.push(dataTime);
            }

            output.splice(findPrefix, 1);
        }

        for (const key of output) {
            tempArray.push(findTime(key))
        }
        // order by popularity
        tempArray.sort((a, b) => b.times - a.times)
        // merge and limit
        return firstItems.concat(tempArray).slice(0, suggestNum);
    }

    return result;
}

Trie.prototype.getTime = function (key, plus) {
    return findTime(key, plus)
}

Trie.prototype.plusAllData = function () {
    return findTime(null, false, true);
}

// recursive function to find all words in the given node.
function findAllWords(node, arr) {
    // base case, if node is at a word, push to output
    if (node.end) {
        arr.unshift(node.getWord());
    }

    // iterate through each children, call recursive findAllWords
    for (let child in node.children) {
        findAllWords(node.children[child], arr);
    }
}
// Allow find the time in the general data;
/**
 * 
 * @param String key 
 * @param Boolean plus 
 */
function findTime(key, plus = false, plusAllData = false) {
    const suggestNum = process.env.SUGGESTION_NUMBER;
    for (const k in generalData) {
        if (k === key) {
            if (plus) {
                generalData[key] = (generalData[key] + 1);
            }
            return { "name": key, "times": generalData[key] };
        }

        if (plusAllData) {
            generalData[k] = (generalData[k] + 1);
        }
    }

    return plusAllData;
}

module.exports = { Trie };