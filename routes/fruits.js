const express = require("express");
const { check, validationResult } = require("express-validator");
const { Fruit } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Fruit.findAll());
});

router.get("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  res.send(fruit);
});

router.post(
  "/",
  [
    check("color").notEmpty().trim(),
    check("name").notEmpty().trim().isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      await Fruit.create(req.body);
      const fruits = await Fruit.findAll();
      res.send(fruits);
    }
  }
);

router.put(
  "/:id",
  [
    check("color").notEmpty().trim(),
    check("name").notEmpty().trim().isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const fruit = await Fruit.findByPk(req.params.id);
      await fruit.update(req.body);
      res.json(fruit);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  await fruit.destroy();
  res.json(fruit);
});

module.exports = router;
