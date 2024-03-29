const { boolean, string, func } = require("joi");
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
// createCourse();

//querying mongodb
async function getCourse() {
  //comparison operators => can be used as key value pairs
  /**
   * Prefix each with $ symbol
   * eq (equal)
   * ne (not equal)
   * gt (greater than)   example => .find({ price: { $gt: 10, $lte: 20 } })    20 >= price >10
   * gte(greater than or equal to)
   * lte(less than or equal to)
   * in     example => find({ price: { $in: [10, 15, 20] } })     price == 10 || 15 || 20
   * nin (not in)
   */

  //logical operators =>
  /**chain with find, sort, update, or some other method like that
   * or =>example => .or([{author:'Mosh'}, {isPublished:true}])
   * and  =>example => .or([{author:'Mosh'}, {isPublished:true}])
   */

  //regular expressions =>
  /**
   example-> * starts with mosh => .find({author: /pattern/})  => pattern can be a regex, in this case, it will be : /^Mosh/
   example-> * ends with flick => .find({author: /pattern/i}) ('i' indicates case insensitivity)  => pattern can be a regex, in this case, it will be : /flick$/i ($-> indicates end of the string)
   example-> * contains mosh => .find({author: /pattern/})  => pattern can be a regex, in this case, it will be : /.*Mosh.*/

  //returns a promise
  //applying filters
  const pageNumber = 2; //hard coding here
  const pageSize = 10; //but in actual application, we pass these values as query string parameters using RestAPI
  //ex=> /api/courses?pageNumber=2&pageSize=10
  const courses = await Course.find({
    author: "Mosh",
    isPublished: true,
  })
    //used to implement pagination
    //assuming pageNumber starts from 1 not its index, with
    .skip((pageNumber - 1) * pageSize) // we need to skip all documents in the prev page
    //building queries
    .limit(pageSize) //change limit to pageSize, to get documents in a given page
    //1 indicates ascending, -1 indicated descending
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    //returns count of the document that match our filter
    .count();
  console.log(courses);
}

// getCourse();

//update a document in MongoDB
async function updateCourse(id) {
  //approach : query first
  //findById()
  //modify its props
  //save()
  // const course = await Course.findById(id);
  // if (!course) return;
  // course.isPublished = true;
  // course.author = "Another Author";
  //alternatively use set method
  // course.set({
  //   isPublished: true,
  //   author: "ANother Author",
  // });
  // const result = await course.save();
  // console.log(result);

  //approach: update first
  //update directly
  //optionally: get the updated document
  //first argumetn is query or filter object, second will be update operators
  const result = await Course.findByIdAndUpdate(
    id,
    //check the mongo db update operators
    {
      $set: {
        author: "Mosh",
        isPublished: true,
      },
    },
    //use this to display the updated doc instead of the old doc after operations
    { new: true }
  );
  console.log(result);
}
// updateCourse("61f59ab1e4bc3ee20aed6d12");

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });  //returns count of deleted objects
  const course = await Course.findByIdAndRemove(id); //returns the deleted object
  console.log(result);
}
removeCourse("61f59ab1e4bc3ee20aed6d12");
