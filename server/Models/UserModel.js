const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userType: {
    type: String,
    default: "user",
    enum: ["user", "admin", "root"],
  },
  visibility: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  follows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      required: true,
    },
  ],
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", UserSchema);
