const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdCONTROLLER,
  getFoodByResturantController,
} = require("../controllers/foodControllers");

const router = express.Router();

//ROUTES
// CREATE FOOD ROUTE
router.post("/create", authMiddleware, createFoodController);

// GET ALL FOODS ROUTE
router.get("/getAll", getAllFoodController);

// GET FOOD BY ID ROUTE
router.get("/get/:id", getFoodByIdCONTROLLER);

// GET FOODS BY RESTURANT ID
router.get("/getByResturant/:id", getFoodByResturantController);

// EXPORTS
module.exports = router;
