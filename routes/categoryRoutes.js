const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

const router = express.Router();

// ROUTES
// CREATE CATEGORY ROUTE
router.post("/create", authMiddleware, createCategoryController);

// GET ALL CATEGORY ROUTE
router.get("/getAll", getAllCategoryController);

// UPDATE CATEGORY ROUTE
router.put("/update/:id", authMiddleware, updateCategory);

// DALETE CATEGORY ROUTE
router.delete("/delete/:id", authMiddleware, deleteCategory);

// exports
module.exports = router;
