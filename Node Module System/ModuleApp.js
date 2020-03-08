// ---------------------LOADING MODULES----------------------

// since app js and logger are in same folder we can use "./""
//Sub folder "./subFolder/mainFolder"
//Parent folder "../"

const logger = require('./logger');     //Its a good practice to use CONST values to avoid changes om 
// const logger = require('./logger');  // A better name would be- const log = require(./logger) When we dont pass it as an object 

console.log(logger);


logger.log("Hello WORLD")  
//logger("Hello World") - If we dont export as object // (or log('Hello World') depends on variable name)


//------------------BUILT IN MODUELS OF NODE
/**
 * Some usefule ones :
 * File System
 * HTTP
 * OS
 * Path - gives utility functions
 * Process - gives info on current services
 * Query Strings - gives info on certain http requests 
 * Stream - allows to work with stream of data
 */