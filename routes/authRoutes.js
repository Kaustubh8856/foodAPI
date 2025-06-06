const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

const router = express.Router();

// routes
// REGISTER, POST method
router.post("/register", registerController);

// LOGIN, POST method
router.post("/login", loginController);

module.exports = router;
