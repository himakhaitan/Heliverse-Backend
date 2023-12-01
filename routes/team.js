const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");
// Create Team

router.post("", async (req, res) => {
  const memberIDs = req.body.members;

  const selectedUsers = await User.find({ id: { $in: memberIDs } });
  //   Change MemberIds to Object Ids
  const memberObjects = selectedUsers.map((user) => user._id);

  // Check if all members are available
  const anyUnavailable = selectedUsers.some((user) => !user.available);

  if (anyUnavailable) {
    return res.json({
      success: false,
      message: "One or more selected users are not available",
    });
  }
  // Check for Unique Domains

  const domains = new Set();
  let hasDuplicateDomain = false;

  selectedUsers.forEach((user) => {
    if (domains.has(user.domain)) {
      hasDuplicateDomain = true;
    }
    domains.add(user.domain);
  });

  if (hasDuplicateDomain) {
    return res.json({
      success: false,
      message: "Users with duplicate domains are not allowed",
    });
  }

  //   Create Team
  const team = new Team({
    members: memberObjects,
  });

  try {
    res.header("Access-Control-Allow-Origin", "*");
    await team.populate("members");
    console.log(team);
    return res.json({ success: true, savedTeam: team });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

// Fetch Team with ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  // Fetch Team with ID
  try {
    const team = await Team.findById(id).populate("members");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    return res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
