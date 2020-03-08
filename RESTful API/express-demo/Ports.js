//Use nodemon instead of node. Helps avoiding compilation of code multiple times

//-----------------ENVIRONMENT VARIABLE---------
//PORTS
//Read the value of port environment variable 

//PORT is variable name
const express = require('express');  //importing the express package 
const app = express();  

app.get('/',(req,res) => {
    res.send('Hello World!!!!');
});

//creating another route
app.get('/api/courses', (req, res) => {
    res.send([1,2,3,4,5,6]);
});

//listening ports by environment variable

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port ",port))
/**Runs on 3000, if theres no environment varible 
 * Use 'set PORT = <value>' to set environment variable, before execution of code in cmd
 */