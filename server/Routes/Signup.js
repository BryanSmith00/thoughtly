const User = require("../Models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");

// Signup authenication flow, checks email, username, and password and creates a user
// jwt token is returned if the user account is created
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "This email is already in use" });
    }

    const existingName = await User.findOne({ username });
    if (existingName) {
      return res.json({ message: "This username is not available" });
    }

    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      // cookie set to expire 1 day in milliseconds from current time
      expires: new Date(Date.now() + 86400 * 1000),
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
