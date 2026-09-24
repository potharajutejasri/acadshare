require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const User = require("./src/models/User");

const createTestUser = async () => {
  try {
    await connectDB();

    await User.findOneAndDelete({
      email: "testuser@acadshare.com"
    });

    const user = await User.create({
      name: "Test User",
      email: "testuser@acadshare.com",
      password: "TemporaryPassword123",
      role: "USER"
    });

    console.log("User created successfully!");
    console.log(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

createTestUser();