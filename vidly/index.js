const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
//handle any uncaught exceptions that arent in any of the catch blocks

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening onf port ${port}`));
