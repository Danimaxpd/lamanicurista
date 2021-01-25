const fs = require('fs');
var globalData = {};
/**
 * Load the names.json into a global variable globalData
 */
exports.onloadData = () => {
    let rawdata = fs.readFileSync('./api/models/names.json');
    let dataRes = JSON.parse(rawdata);
    console.log('data loaded from names.json');
    globalData = dataRes;
}

/**
 * Search in file names.json
 * @param {string} prefix 
 */
exports.SearchTree = (prefix) => {
    return globalData;
}
/**
 * Add into 
 * @param {Object} data 
 */
exports.AddIntree = (data) => {

}

function searchTreeFind(prefix) {
    
}