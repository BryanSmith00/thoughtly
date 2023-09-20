const User = require("../Models/UserModel");
const Thought = require("../Models/ThoughtModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.CreateThought = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ status: false });

    // TODO factor out the token verification
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) return res.json({ status: false });
      else {
        const user = await User.findById(data.id);
        if (user) {
          const { text } = req.body;
          await Thought.create({ text, user });

          return res
            .status(201)
            .json({ message: "Successfully posted", success: true });
        } else return res.json({ status: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
