const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validationFunc = require("../validation/newUser");
const isEmpty = require("../utils/isEmpty");
// Fetch All the Users
router.get("/", async (req, res) => {
  try {
    const filterCriteria = {};
    const {
      domain,
      gender,
      available,
      name,
      page = 1,
      limit = 20,
    } = req.query;

    if (!isEmpty(domain)) filterCriteria.domain = domain;
    if (!isEmpty(gender)) filterCriteria.gender = gender;
    if (!isEmpty(available)) filterCriteria.available = available === "true";

    let searchCriteria = {};
    if (name)
      searchCriteria = {
        first_name: { $regex: new RegExp(name, "i") },
      };

    const users = await User.find({
      $and: [filterCriteria, searchCriteria],
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    return res.json(users);
  } catch (err) {
    return res.json({ message: err });
  }
});

// Fetch a Specific User
router.get("/:id", async (req, res) => {
  try {
    const fetched_user = await User.findOne({ id: req.params.id });
    return res.json(fetched_user);
  } catch (err) {
    return res.json({ message: err });
  }
});

// Create a New User
router.post("/", async (req, res) => {
  // Validate the data
  validationFunc(req.body);

  const prevUser = User.find().sort({ id: -1 }).limit(1);
  const prevId = prevUser.id;
  const user = new User({
    id: prevId + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    avatar: req.body.avatar,
    domain: req.body.domain,
    available: req.body.available,
  });

  try {
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (err) {
    return res.json({ message: err });
  }
});

// Update a User
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  // Check if user exists
  const user = User.findOne({ id: id });
  if (!user) {
    return res.json({ message: "User does not exist" });
  }
  // Update the user
  User.updateOne({ id: id }, { $set: req.body }, (err) => {
    if (err) {
      return res.json({ message: err });
    }
    return res.json({ message: "User updated successfully" });
  });
});

// Delete a User
router.delete("/:id", async (req, res) => {
  // Check if User exists
  const user = User.findOne({ id: id });
  if (!user) {
    return res.json({ message: "User does not exist" });
  }

  // Delete the user

  User.deleteOne({ id: id }, (err) => {
    if (err) {
      return res.json({ message: err });
    }
    return res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
