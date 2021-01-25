const fs = require('fs');
const TrieSearch = require('./trie');

var ts = new TrieSearch.Trie();
/**
 * Load the names.json into a global variable globalData
 */
exports.onloadData = () => {
    let rawdata = fs.readFileSync('./api/models/names.json');
    let dataRes = JSON.parse(rawdata);

    Object.keys(dataRes).forEach(key => {
        ts.insert(key);
    });
    ts.loadData(dataRes);
    console.info('data loaded from names.json');
}

/**
 * Search in file names.json
 * @param {string} prefix 
 */
exports.SearchTree = (prefix) => {
    const data = ts.find(prefix);

    return ts.orderOutput(prefix, data);
}
/**
 * Add into 
 * @param {Object} data 
 */
exports.AddIntree = (data) => {
    const findPrefix = ts.find(data);
    console.log('findPrefix', findPrefix.length > 0);
    if (findPrefix && findPrefix.length > 0) {
        return ts.getTime(data, true);
    } else {
        return !ts.plusAllData();
    }
}