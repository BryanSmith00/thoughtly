const User = require("../Models/UserModel");
const Thought = require("../Models/ThoughtModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Profile = async (req, res) => {
  const token = req.cookies.token;
  user = await User.find({ username: req.body.username });

  console.log(user);

  res.json(
    await Thought.find({ user: user })
      .populate("user")
      .sort({ createdAt: -1 })
      .select(
        "username displayName profilePic text image likes reposts replies createdAt"
      )
  );
  return res;
};
