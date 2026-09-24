require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const User = require("./src/models/User");
const Resource = require("./src/models/Resource");
const Report = require("./src/models/Report");

const createTestReport = async () => {
  try {
    await connectDB();

    const user = await User.findOne({
      email: "testuser@acadshare.com"
    });

    const resource = await Resource.findOne({
      title: "DBMS Normalization Notes"
    });

    if (!user) {
      console.log("Test user not found.");
      return;
    }

    if (!resource) {
      console.log("Test resource not found.");
      return;
    }

    const report = await Report.create({
      resource: resource._id,
      reportedBy: user._id,
      reason: "Testing the resource reporting system"
    });

    console.log("Report created successfully!");
    console.log(report);
  } catch (error) {
    console.error("Error creating report:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

createTestReport();