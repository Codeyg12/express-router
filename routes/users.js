const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.post(
  "/",
  [
    check("name").notEmpty().trim().isLength({ min: 5, max: 15 }),
    check("age").notEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      await User.create(req.body);
      const users = await User.findAll();
      res.send(users);
    }
  }
);

router.put(
  "/:id",
  [
    check("name").notEmpty().trim().isLength({ min: 5, max: 15 }),
    check("age").notEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const user = await User.findByPk(req.params.id);
      await user.update(req.body);
      res.json(user);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json(user);
});

module.exports = router;
