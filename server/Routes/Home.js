const User = require("../Models/UserModel");
const Thought = require("../Models/ThoughtModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Home = async (req, res) => {
  const token = req.cookies.token;

  // If the request has no token then present all thoughts for the home feed
  // TODO: make this select only a certain number to load at once rather than all
  if (!token) {
    res.json(await Thought.find().sort({createdAt: -1}).select("user text likes reposts").limit(10));
    return res;
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log(err)
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        // TODO: once user following is implemented select all thoughts from users
        // that are followed and return them for the home feed
        res.json(await Thought.find().sort({createdAt: -1}).select("user text likes reposts").limit(10));
        return res;
      } else {
        return res.json({ status: false, message: "invalid token" });
      }
    }
  });
};
