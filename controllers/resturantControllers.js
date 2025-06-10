const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT CONTROLLER
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address.",
      });
    }
    // creating new user
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save(); // new user saved
    res.status(201).send({
      success: true,
      message: "Resturant created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create resturant API",
      error,
    });
  }
};

// GET ALL RESTURANT CONTROLLER
const getAllResturantController = async (req, res) => {
  try {
    // find all resturants
    const resturants = await resturantModel.find({});
    // validation
    if (!resturants) {
      return res.status(404).send({
        success: False,
        message: "No resturants found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all resturant API",
      error,
    });
  }
};

// GET RESTURANT BY ID CONTROLLER
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide resturant ID",
      });
    }
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Resturant found successfully",
      resturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get resturant by ID API.",
    });
  }
};

// DELETE RESTURANT BY ID CONTROLLER
const deleteResturant = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No resturant found or please provide resturant ID",
      });
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete resturant API",
      error,
    });
  }
};
// exports
module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturant,
};
