//Path is a built in Node module  

//The path module provides utilities for working with file and directory paths. It can be accessed using:

const path = require('path');   
/**
 *  assumes it to be a built in function only if it is 'path'
 * If we add ./path or ../path or any other location, node assumes it to be a file 
 */


var pathObj = path.parse(__filename);
console.log(pathObj);

//learn more on node js docs 