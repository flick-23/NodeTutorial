const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

//VIEW
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customers = await Customer.findById(req.params.id);

  if (!customers)
    return res.status(404).send("The genre you're looking for is not found");
  res.send(customers);
});

//CREATE
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customers = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customers = await customers.save();

  res.send(customers);
});

//UPDATE
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customers = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    {
      new: true,
    }
  );

  if (!customers)
    return res.status(404).send("The Customer with the given ID was not found");
  res.send(customers);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("Customer not found!");

  res.send(customer);
});

module.exports = router;
