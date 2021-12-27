const Joi = require("joi");
const express = require("express");
const { func, valid } = require("joi");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!! Watcha doin !?");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});
//-------------------------------------------------------------------------------
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
//-------------------------------------------------------------------------------
app.put("/api/courses/:id", (req, res) => {
  //Look up the course
  //If not exsisting, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  //Validate
  //If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  //Update course
  //Return the updated course
  course.name = req.body.name;
  res.send(course);
});
//----------------------------------------------------------------------------
app.delete("/api/courses/:id", (req, res) => {
  //Look up the course with given ID
  //nt existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
  //return the same course
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
