//Updates an existing course

//importing express package
const express = require('express');
const app = express();

const Joi = require('joi');     //importing package for input validation


//adding a piece of middle ware
app.use(express.json());     


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
app.post('/api/courses',(req,res) =>{
    //INPUT VALIDATION

    const schema = {
        name: Joi.string().min(3).required()        //should be a string, and min 3 chars
    };
    const result = Joi.validate(req.body, schema);  //storing the result


    if(result.error)
    {
        //this gives complex results
        //res.status(400).send(result.error);

        //alternative way & better
        res.status(400).send(result.error.details[0].message);
        return;
    }
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