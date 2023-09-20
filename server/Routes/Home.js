const Thought = require("../Models/ThoughtModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Home = async (req, res) => {
  try {
    data = await Thought.find().select("text likes reposts")
    res.json(data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
