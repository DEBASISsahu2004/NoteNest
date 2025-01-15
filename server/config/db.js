const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
  } catch (error) {
    console.log("Error in connecting DB: ", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectDB;
