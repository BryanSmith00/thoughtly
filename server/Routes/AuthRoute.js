const { Signup } = require("./Signup");
const { Login } = require("./Login");
// home page for now
const { userVerification } = require("../Middleware/AuthMiddleware");
// new home page, work in progress
const { Home } = require("./Home");
const { CreateThought } = require("./CreateThought");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/createthought", CreateThought);
router.get("/home", Home);

module.exports = router;
