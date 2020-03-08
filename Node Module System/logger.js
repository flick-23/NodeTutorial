//------------------------Creating and loading MODULE------------------------

var url = 'http://mylogger.io.log'; 

function log(message)
{
    //Send an HTTP request
    console.log(message)
}

module.exports.log = log;  //exports log function an object
// module.export = log  // export directly

//module.exports.url = url;  //exports the url variable
//module.exports.<var_name> = <variable from local to be exported>
// For instance - module.exports.endURL = url;

console.log(__filename);
console.log(__dirname);

/**Basically all this is wrapped in a function during execution :
 * (function(exports, require, module, __filename, __dirname)
 * {
 *      // all the above lines of code
 * })
 */

 //------------------------------PATH MODULE------------------------------------