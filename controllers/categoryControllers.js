const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY CONTROLLER
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "New category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create category API",
    });
  }
};

// GET ALL CATEGORY CONTROLLER
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories available.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Categories found",
      categoriesLength: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all category API!",
      error,
    });
  }
};

// UPDATE CATEGORU CONTROLLER
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { newTitle, imageUrl } = req.body;
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found!",
      });
    }
    if (!newTitle) {
      return res.status(500).send({
        success: false,
        message: "Please provide new title.",
      });
    }
    category.title = newTitle;
    await category.save();
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category API!",
      error,
    });
  }
};

// DELETE CATEGORY CONTROLLER
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide ID to delete a category.",
      });
    }
    const category = categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No category found with this ID",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete category API",
      error,
    });
  }
};

// EXPORTS
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategory,
  deleteCategory,
};
