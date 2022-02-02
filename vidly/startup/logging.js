require("express-async-errors");
require("winston-mongodb");
const winston = require("winston");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  //handle any uncaught rejected promises
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  //add the new keyword
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "info", //or others like error etc
    })
  );
};
