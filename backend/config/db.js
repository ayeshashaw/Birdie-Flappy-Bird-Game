const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb is Connected");
  } catch (error) {
    console.log("Mongodb is not Connected", err);
  }
};

module.exports = connectDB;
