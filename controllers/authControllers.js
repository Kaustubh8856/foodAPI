const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Register controller
const registerController = async (req, res) => {
  try {
    const { email, userName, phone, address, password } = req.body;
    // validation: checking if all fields are filled
    if (!userName || !email || !phone || !address || !password) {
      return res.status(500).send({
        success: false,
        message: "Please enter all fields",
      });
    }
    // check if user is already existing using email - email should be unique
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already registered. Please Login",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user is all above validations are done
    const user = await userModel.create({
      userName,
      email,
      phone,
      address,
      password: hashedPassword,
    });
    res.status(201).send({
      success: true,
      message: "Successfully registered.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// Login controller
const loginController = async (req, res) => {
  try {
    // checking if all fields are provided
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Please provide your email and passowrd.",
      });
    }
    // checking if user is registered to login
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials.",
      });
    }
    //  token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7D",
    });

    // user.password = undefined  // this hides the password filed in the database
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API.",
      error,
    });
  }
};

// exports
module.exports = { registerController, loginController };
