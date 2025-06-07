const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePassword,
  resetPasswordController,
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

// RESET PASSWORD ROUTE
router.post("/resetPassword", authMiddleware, resetPasswordController);

module.exports = router;
