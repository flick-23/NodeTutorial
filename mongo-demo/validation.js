//Implement data validation
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB : ", err));

const courseSchema = new mongoose.Schema({
  //making the name required
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    // name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  //use try catch to catch exception
  try {
    // const result = await course.save();
    // console.log(result);
    //OR uuse this method
    await course.validate();
  } catch (ex) {
    console.log(ex.message);
  }
}

createCourse();
