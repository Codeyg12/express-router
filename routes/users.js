const express = require("express");
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

router.post("/", async (req, res) => {
  await User.create(req.body);
  const users = await User.findAll();
  res.send(users);
});

router.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json(user);
});

module.exports = router;
