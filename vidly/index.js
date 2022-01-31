const app = express();
const customers = require("./routes/customers");
const express = require("express");
const genres = require("./routes/genres");
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");

const { func, valid } = require("joi");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("DB connected..."))
  .catch((er) => console.error("DB connection error! "));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening onf port ${port}`));
