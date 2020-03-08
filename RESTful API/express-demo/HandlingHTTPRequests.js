//Implementing an end point to get single a single course from server

//importing express package
const express = require('express');
const app = express();

const courses = [
    {id: 1, name: 'JAVA'},
    {id: 2, name: 'C'},
    {id: 3, name: 'C++'},
]
//creating a route
app.get('/',(req,res) => {
    res.send("Hello World!!");
})

//creating a route to return all courses
app.get('/api/courses',(req,res) => {
    //use 'find' function of JS to find the particular course 
    //convert the string to int using Parse method
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) //404
        res.status(404).send('The course with given ID was not found')

    res.send(course)
})

//creating a route with a parameter to return a particular course
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);    // reads one parameter
})


//listening ports by environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port ",port))