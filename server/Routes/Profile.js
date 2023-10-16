const User = require("../Models/UserModel");
const Thought = require("../Models/ThoughtModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Profile = async (req, res) => {
  const token = req.cookies.token;

  res.json(
    await Thought.find({username: req.username})
      .populate("user")
      .sort({ createdAt: -1 })
      .select(
        "username displayName profilePic text image likes reposts replies createdAt"
      )
      .limit(10)
  );
  return res;
};
