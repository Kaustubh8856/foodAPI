const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController } = require("../controllers/foodControllers");

const router = express.Router();

//ROUTES
// CREATE FOOD ROUTE
router.post("/create", authMiddleware, createFoodController);

// EXPORTS
module.exports = router;
