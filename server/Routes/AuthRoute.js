const { Signup } = require("./Signup");
const { Login } = require("./Login");
// home page for now
const { userVerification } = require("../Middleware/AuthMiddleware");
// new home page, work in progress
const { Home } = require("./Home");
const { CreateThought } = require("./CreateThought");
const { Profile } = require("./Profile");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/createthought", CreateThought);
router.post("/home", Home);
router.post("/profileposts", Profile);

module.exports = router;
