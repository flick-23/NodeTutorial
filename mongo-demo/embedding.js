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
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
removeAuthor("61f7a89fb50e3a0ab0dd757c", "61f7a8ef4c903f62a28d17d9");
// addAuthor("61f7a89fb50e3a0ab0dd757c", new Author({ name: "Ivy" }));
// updateAuthor("61f78d80c4bad228905a0fad");
// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "FLick" }),
// ]);
