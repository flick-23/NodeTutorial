//Create a route to get a single course
//end point will be the get url like : '/api/courses/1'

//importing express package
const express = require('express');
const app = express();

//creating a route
app.get('/',(req,res) => {
    res.send("Hello World!!");
})

//creating a route
app.get('/api/courses',(req,res) => {
    res.send([1,2,3,4,5]);
})

//creating a route with a parameter
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);    // reads one parameter
})

//creating a route with multiple parameters
app.get('/api/posts/:year/:month/:day',(req,res) =>{
    res.send(req.params);       //reads multiple parameters
})

///query string parameters
app.get('/api/posts/:no',(req,res) =>{
    res.send(req.query);    //query can be - ?sortBy=name
})

//listening ports by environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port ",port))