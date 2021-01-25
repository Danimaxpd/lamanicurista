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
        ts.insert(key, dataRes[key]);
    });
    
    console.info('data loaded from names.json');
}

/**
 * Search in file names.json
 * @param {string} prefix 
 */
exports.SearchTree = (prefix) => {
    console.log('result --->', ts.find(prefix));  
    return true;
}
/**
 * Add into 
 * @param {Object} data 
 */
exports.AddIntree = (data) => {

}