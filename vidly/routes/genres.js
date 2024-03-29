const { validate, Genre } = require("../models/genre");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

//VIEW
router.get("/", async (req, res) => {
  //for testing only
  // throw new Error("Could not get the genres");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre you're looking for is not found");
  res.send(genre);
});

//CREATE
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();

  res.send(genre);
});

//UPDATE
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The course with the given ID was not found");
  res.send(genre);
});

//DELETE
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("Genre not found!");

  res.send(genre);
});

module.exports = router;
