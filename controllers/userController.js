const userModel = require("../models/userModel");
// GET USER DATA CONTOLLER
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.user.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // hide password before showing user data
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get user API.",
      error,
    });
  }
};

// UPDATE USER CONTROLLER
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.user.id);
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // if user found, then update user
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // save user
    await user.save();
    res.status(200).send({
      success: false,
      message: "Update user successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error,
    });
  }
};

module.exports = { getUserController, updateUserController };
