// Creating my 1st web server

const express = require('express');  //importing the express package 

const app = express();  

/**
 * app.get();       //get list of all data
 * app.post();      //create 
 * app.put();   //update
 * app.delete();    // delete
 */

//Implementing http get request
// app.get('path', <function to be called whne the request is sent>)
app.get('/',(req,res) => {
    res.send('Hello World!!!!');
});

//creating another route
app.get('/api/courses', (req, res) => {
    //in real world we deal with database here, but for simplicity as we are learning abt Express
    // we will simply return an array of numbers
    res.send([1,2,3,4,5,6]);
});

//creating a server to listen
//passing a function is optional, that is when when the function starts listening, the statements in the 
//function get executed!
app.listen(3000, () => {
    console.log("Listening on port 3000")
});
//to learn about all properites, check the docs of expressjs.com

