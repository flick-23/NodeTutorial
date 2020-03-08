//Working with files in node 

const fs = require('fs');   //importing fileSystem module

//Every operation is in Synchronous or Blocking , or Asynchronous or non blocking 
//Avoid using Sync methods - its used for simplicity
//For real world applications use Async , cz these are non blocking 

const files = fs.readdirSync('./'); //Sync form 
console.log(files);

//Async form of the above method

// Observe the intellisense, declare a function to handle the output if there is error or not
// fs.readdir('<path>', function(err, files){
//  ..statements ..})    

fs.readdir('./', function(err, files){
    if(err) 
        console.log('ERROR',err);
    else
        console.log("Result",files);
})

//For more examples read node docs - File System Module