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
