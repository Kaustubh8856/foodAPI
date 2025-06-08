const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturant,
} = require("../controllers/resturantControllers");
const router = express.Router();

// routes
// CREATE RESTURANT || POST
router.post("/create", authMiddleware, createResturantController);

// GET ALL RESTURANT || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID ROUTE || GET
router.get("/getResturantID/:id", getResturantByIdController);

// DELETE RESTURANT BY ID || DELETE
router.delete("/deleteResturant/:id", authMiddleware, deleteResturant);

// exports
module.exports = router;
