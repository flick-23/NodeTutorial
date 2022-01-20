const Joi = require("joi");
const express = require("express");
const genres = require("./routes/genres");
const { func, valid } = require("joi");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening onf port ${port}`));
