const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const { func, valid } = require("joi");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("DB connected..."))
  .catch((er) => console.error("DB connection error! "));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening onf port ${port}`));
