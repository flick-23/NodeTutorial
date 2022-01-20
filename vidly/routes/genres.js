const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

//VIEW
router.get("/", (req, res) => {
  res.send(genres);
});
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre you're looking for is not found");
  res.send(genres.id);
});

//CREATE
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//UPDATE
router.put("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res(genre);
});

//DELETE
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.find(g.id === parseInt(req.params.id)));
  if (!genre) return res.status(404).send("Genre not found!");

  const index = genres.indexOf(genre);
  genres.split(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).require(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
