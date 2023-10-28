const User = require("../Models/UserModel");
const Thought = require("../Models/ThoughtModel");

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.likePost = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.json({ status: false });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);

      if (user) {
        const post = await Thought.findById(req.body.post_id);

        // if the user is in the likes array, pulls it, otherwise adds it
        if (post.likes.includes(user._id))
          await post.updateOne({ $pull: { likes: user._id } });
        else await post.updateOne({ likes: user });

        return res.json({ status: true, user: user.username });
      } else return res.json({ status: false });
    }
  });
};
