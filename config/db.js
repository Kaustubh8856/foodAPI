const mongoose = require("mongoose");

// database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB error", error);
  }
};

module.exports = connectDB;
