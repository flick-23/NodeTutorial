const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const logger = require("./middleware");
const { func, valid } = require("joi");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");
app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

//Configuration
console.log("Application Name : " + config.get("name"));
console.log("Mail Server : " + config.get("mail.host"));
// console.log("Mail Password : " + config.get("mail.password"));

app.use(morgan("tiny"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled ... ");
}

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
