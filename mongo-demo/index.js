const { boolean, string } = require("joi");
const mongoose = require("mongoose");

//connection string
////this method creates a promise
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB : ", err));

//schemas => use schemas to define shape of docs within  a collection of mongodb
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now }, //we can set default values like this
  isPublished: Boolean,
  //   other datatypes that can be used are
  //   string, number, date, buffer, boolean, objectID, array
});

//compling the schema into a model
//Classes, objects
//Course, nodeCourse

//creating Course class
const Course = mongoose.model("Course", courseSchema); //collection that this model is for, schema that defines the shape of document of the collection
//creating object of the course
//creating async function because saving a document is a process that takes time and gives result after a while
async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    //date has default value so not defining it
    isPublished: true,
  });
  const result = await course.save(); //awaiting for the promise to  return
  console.log(result);
}
createCourse();
