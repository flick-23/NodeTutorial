const express = require("express");
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);

const app = express();
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");
//handle any uncaught exceptions that arent in any of the catch blocks

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening onf port ${port}`));
