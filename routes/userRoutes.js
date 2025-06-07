const express = require("express");
const {
  getUserController,
  updateUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
// Routes:
// GET USER ROUTE
router.post("/getUser", authMiddleware, getUserController);

// UPDATE USER ROUTE
router.put("/updateUser", authMiddleware, updateUserController);
module.exports = router;
