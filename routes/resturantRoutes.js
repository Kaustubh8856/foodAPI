const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
} = require("../controllers/resturantControllers");
const router = express.Router();

// routes
// CREATE RESTURANT || POST
router.post("/create", authMiddleware, createResturantController);

// GET ALL RESTURANT || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID ROUTE || GET
router.get("/getResturantID/:id", getResturantByIdController);

// exports
module.exports = router;
