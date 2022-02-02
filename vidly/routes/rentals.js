const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const auth = require("../middleware/auth");
const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const router = express.Router();

Fawn.init("mongodb://localhost/vidly");

//VIEW
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Customer.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental you're looking for is not found");
  res.send(rental);
});

//CREATE
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.name,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  //transaction verification - here we are working directly with the collection and the names here are caseSensitive
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } }) //decrement numberInStock by 1 and update movie
      .run(); //if u dont call run() none of these operations will be executed
    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed");
  }
});

module.exports = router;
