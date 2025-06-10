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
      resturant,
      rating,
    } = req.body;
    if (!title || !description || !price || !resturant) {
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
      resturant,
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

// GET FOOD BY RESTURANT ID CONTROLLER
const getFoodByResturantController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide resturant ID",
      });
    }
    const foods = await foodModal.find({ resturant: id });
    if (!foods) {
      return res.stauts(500).send({
        success: false,
        message: "No foods found for this resturant.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food items found",
      Length: foods.length,
      foods: foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get food by resturant API!",
      error,
    });
  }
};

// UPDATE FOOD BY ID CONTROLLER
const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModal.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with that id.",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturant,
      rating,
    } = req.body;
    const updatedFood = await foodModal.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food updated.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in update food API",
    });
  }
};

// DELETE FOOD CONTROLLER
const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(500).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModal.findById(id);
    if (!food) {
      res.status(404).send({
        success: false,
        message: "No food found with that id",
      });
    }
    await foodModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Food item deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API!",
      error,
    });
  }
};
// exports
module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdCONTROLLER,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
};
