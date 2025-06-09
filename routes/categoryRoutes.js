const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
} = require("../controllers/categoryControllers");

const router = express.Router();

// ROUTES
// CREATE CATEGORY ROUTE
router.post("/create", authMiddleware, createCategoryController);

// exports
module.exports = router;
