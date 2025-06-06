const mongoose = require("mongoose");

// define user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    addredd: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    usertype: {
      type: String,
      required: [true, "usertype is required"],
      dafault: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      defailt: "https://pixabay.com/images/search/user%20icon/",
    },
  },
  { timestamps: true }
);

// exporting schema
module.exports = mongoose.model("User", userSchema);
