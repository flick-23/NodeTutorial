require("express-async-errors");
require("winston-mongodb");
const auth = require("./routes/auth");
const config = require("config");
const customers = require("./routes/customers");
const error = require("./middleware/error");
const express = require("express");
const genres = require("./routes/genres");
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const winston = require("winston");

const app = express();

//handle any uncaught exceptions that arent in any of the catch blocks
process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION!");
  winston.error(ex.message, ex);
});

// throw new Error("Something Failed during startup"); for testing
//add the new keyword
winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly",
    level: error, //or others like info etc
  })
);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("DB connected..."))
  .catch((er) => console.error("DB connection error! "));

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening onf port ${port}`));
