const mongoose = require("mongoose");

//connection string
////this method creates a promise
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB : ", err));
