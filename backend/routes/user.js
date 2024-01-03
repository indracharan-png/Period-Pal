const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// login route
router.use("/login", loginUser);

// signup route
router.use("/signup", signupUser);

module.exports = router;
