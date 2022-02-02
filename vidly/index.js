require("express-async-errors");
require("winston-mongodb");
const config = require("config");
const express = require("express");
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const winston = require("winston");
const app = express();
require("./startup/routes")(app);
//handle any uncaught exceptions that arent in any of the catch blocks

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

//handle any uncaught rejected promises
process.on("unhandledRejection", (ex) => {
  // console.log("WE GOT AN UNHANDLED REJECTION!");
  // winston.error(ex.message, ex);
  // process.exit(1);
  //or
  throw ex;
});

// throw new Error("Something Failed during startup"); for testing
// const p = Promise.reject(new Error("Something failed miserably!"));
// p.then(() => console.log("DOne"));

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening onf port ${port}`));
