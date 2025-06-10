const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is require"],
    },
    description: {
      type: String,
      required: [true, " food description is requir"],
    },
    price: {
      type: Number,
      required: [true, "food price is require"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    foodTags: {
      type: String,
    },
    catgeory: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailabe: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);
