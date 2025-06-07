const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
// Routes:
// GET USER ROUTE
router.post("/getUser", authMiddleware, getUserController);

// UPDATE USER ROUTE
router.put("/updateUser", authMiddleware, updateUserController);

// UPDATE PASSWORD ROUTE
router.post("/updatePassword", authMiddleware, updatePassword);

module.exports = router;
