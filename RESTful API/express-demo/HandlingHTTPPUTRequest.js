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


    if(result.error)    //handle error
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {

        id: courses.length + 1,
        name: req.body.name  
    }
    courses.push(course);
    res.send(course);
})


//building logic for updating a course
app.put('/api/courses/:id',(req,res) =>{
    /**Look up the course
     * If does not exist, return 404
     * 
     * Validate
     * If invalid, return 400 Bad Request
     * 
     * Update course
     * Return
     * 
     */

     //Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) //404
        res.status(404).send('The course with given ID was not found')

    //Input Validation
    const result = validateCourse(req.body);
    if(result.error)    //handle error
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name;
    res.send(course);

    const result = Joi.validate(req.body, schema);  //storing the result
    
})




//listening ports by environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port ",port))


function validateRequest(course)
{
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}