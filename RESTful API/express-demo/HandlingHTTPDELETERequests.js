//Deletes an Existing course

//importing express package
const express = require('express');
const app = express();

const Joi = require('joi');     //importing package for input validation

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

//creating a route to return a particular course
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) //404
        return res.status(404).send('The course with given ID was not found')

    res.send(course)
})

//post request to create a new COURSE
app.post('/api/courses',(req,res) =>{
    //INPUT VALIDATION
    const {error} = validateCourse(req.body);   //eqvi to getting result.error
        if(error)        //Error Handling
        {
            res.status(400).send(error.details[0].message);
            return;
        }
    const course = {
        id: courses.length + 1,
        name: req.body.name  
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id',(req,res) =>{
     //Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) //404
        return res.status(404).send('The course with given ID was not found')

        //Validating
        const {error} = validateCourse(req.body); 
        if(error)        //Error Handling
        {
            res.status(400).send(error.details[0].message);
            return;
        }
        //Update the course and return updated course
        course.name = req.body.name;
        res.send(course);

})


app.delete('/api/courses/:id',(req,res) =>{
    /**
     * Look up course
     *      Return 404 if it doesnt exist
     * Delete
     * Return same course
     */

     //Look up a course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) //404
        return res.status(404).send('The course with given ID was not found')
    
    //Delete a course
    const index = courses.indexOf(course);  //look up index of course
    courses.splice(index, 1);   //deletes element from array, replaces if needed nd returns deleted element
    //Return the reposne to client    
    res.send(course);
})

//listening ports by environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port ",port))

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()        //should be a string, and min 3 chars
    };
    return Joi.validate(course, schema);        // return result
}