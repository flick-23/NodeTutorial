const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: { type: authorSchema, required: true },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //update directly in the database
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        //use unset to remove
        "author.name": "Ivy Flick",
      },
    }
  );
}
updateAuthor("61f78d80c4bad228905a0fad");
// createCourse("Node Course", new Author({ name: "Mosh" }));
