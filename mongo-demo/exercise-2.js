const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);
async function getCourse() {
  return (courses = await Course.find({
    //published frontend and backend courses
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort("-price") //sort prices in descending
    .select({ name: 1, author: 1 })); //pick name and author
}
async function run() {
  const course = await getCourse();
  console.log(course);
}
run();
