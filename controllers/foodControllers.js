const foodModal = require("../models/foodModal");

// CREATE FOOD CONTROLLER
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    if (!title || !description || !price || !resturnat) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// GET ALL FOODS CONTROLLER
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No foods found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Foods found.",
      TotalFoodItems: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all food API!",
      error,
    });
  }
};

// GET FOOD BY ID CONTROLLER
const getFoodByIdCONTROLLER = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide the ID!",
      });
    }
    const food = await foodModal.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food item not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Item found",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messgae: "Error in get food by ID API!",
      error,
    });
  }
};
// exports
module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdCONTROLLER,
};
