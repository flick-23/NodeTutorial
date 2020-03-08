//Take a post from user to add a course

//importing express package
const express = require('express');
const app = express();

//adding a piece of middle ware
app.use(express.json());     //will be explored later in detail


const courses = [
    {id: 1, name: 'C'},
    {id: 2, name: 'C++'},
    {id: 3, name: 'JAVA'},
]

//creating a route to return all courses
app.get('/api/courses',(req,res) => {
    res.send(courses);   
})

//post request to create a new COURSE
//similar to get method, add a path
app.post('/api/courses',(req,res) =>{
    const course = {

        id: courses.length + 1,
        //this feature isnt enabled by default by express
        //In order to make this line work, need to enable, parsing of JSON objects in the body of requests 
        name: req.body.name  
    }
    courses.push(course);
    res.send(course);
})

//listening ports by environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port ",port))


//Test it using POSTMAN
/**
 * >raw
 * >json
 */