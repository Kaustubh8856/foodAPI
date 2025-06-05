const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// dot env config
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan());

// Routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
