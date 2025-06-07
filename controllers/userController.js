const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
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

// UPDATE PASSWORD CONTROLLER
const updatePassword = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // get data from user
    const { oldPass, newPass } = req.body;
    if (!oldPass || !newPass) {
      return res.status(500).send({
        successs: false,
        message: "Please provide all fields",
      });
    }

    // checking if oldPass matches the old password
    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    // hashing and saving new password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    user.password = hashedPassword;
    // saving the user
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password API",
      //   error,
    });
  }
};

// RESET PASSWORD CONTROLLER
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPass, answer } = req.body;
    if (!email || !newPass || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Email not found or incorrect answer",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in password reset API",
      error: error,
    });
  }
};

// EXPORT
module.exports = {
  getUserController,
  updateUserController,
  updatePassword,
  resetPasswordController,
};
