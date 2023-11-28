const mongoose = require("mongoose");
require("dotenv").config();
const mongodbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.MOGODB_PASS}@cluster0.0fnhvxl.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
