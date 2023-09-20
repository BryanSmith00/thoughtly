const { Signup } = require("./Signup");
const { Login } = require("./Login");
// home page for now
const { userVerification } = require("../Middleware/AuthMiddleware");
const { CreateThought } = require("./CreateThought")
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification)
router.post("/createthought", CreateThought)

module.exports = router;
