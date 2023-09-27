const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      required: true,
    },
  ],
  reposts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      required: true,
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
      default: [],
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Thought", ThoughtSchema);
