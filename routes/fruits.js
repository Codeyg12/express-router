const express = require("express");
const { Fruit } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Fruit.findAll());
});

router.get("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  res.send(fruit);
});

router.post("/", async (req, res) => {
  await Fruit.create(req.body);
  const fruits = await Fruit.findAll();
  res.send(fruits);
});

router.put("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  await fruit.update(req.body);
  res.json(fruit);
});

router.delete("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  await fruit.destroy();
  res.json(fruit);
});

module.exports = router;
