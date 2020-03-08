const http = require('http');   //import http module

//const server = http.createServer(); //this server is an EventEmitter, and all its capabilities  

/** This is sort of low level
server.on('connection', (socket) => {
    //statements
    console.log("New connection!")
})
*/

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write("Hello World");
        res.end();
    }

    if(req.url === '/api/courses')      //this block is executed for- localhost:3000/api/courses
    {
        //Here we will return list of courses from database
        // We return array of objects using JSON.stringify, 
        //For simplicity lets not think about database and stuff and simply pass an array of numbers
        res.write(JSON.stringify([1,2,3])); 
        res.end();      
    }
});
/**
 * On program execution, server 3000 is online, evertime, someone opens localhost:3000 on their pc,
 * they will get the output of function above (in above case, Hello World is displayed on Web Page)
 */

server.listen(3000)     //3000 is port

console.log("Listening on port 3000...")    
/**
 * On running the application, the server will listen on port 3000
 * On every request, the server raises an event, and we can use the on method to raise the event
 * 
 */
  /**We will not use HTTP for backend
   * Because, as we add more routes, the code gets more complex, cz we have it in a linear way in call 
   * back function. (in our case the call back function starts from line 12)
   * TH
   */