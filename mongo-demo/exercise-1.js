const { boolean, string } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to mongo-exercises DB"))
  .catch((err) =>
    console.error("Could not connect to mongo-exercises DB ", err)
  );
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
  return (courses = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 }));
}
async function run() {
  const courses = await getCourse();
  console.log(courses);
}
run();
