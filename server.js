require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Academic Resource Sharing API is running"
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
