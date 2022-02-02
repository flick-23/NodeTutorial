const config = require("config");
const express = require("express");
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);

const app = express();
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();

//handle any uncaught exceptions that arent in any of the catch blocks

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening onf port ${port}`));
