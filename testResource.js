require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const User = require("./src/models/User");
const Resource = require("./src/models/Resource");

const createTestResource = async () => {
  try {
    await connectDB();

    const user = await User.findOne({
      email: "testuser@acadshare.com"
    });

    if (!user) {
      console.log("Test user not found.");
      return;
    }

    const resource = await Resource.create({
      title: "DBMS Normalization Notes",
      description: "Notes covering 1NF, 2NF and 3NF.",
      subject: "DBMS",
      resourceType: "NOTES",
      resourceUrl: "https://example.com/dbms-notes",
      createdBy: user._id
    });

    console.log("Resource created successfully!");
    console.log(resource);
  } catch (error) {
    console.error("Error creating resource:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

createTestResource();