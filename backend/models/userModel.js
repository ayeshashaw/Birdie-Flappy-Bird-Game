const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },

    passwordOTP: {
      otp: { type: String },
      send_time: { type: Date },
      limit: { type: Number, default: 5 }
    },
    highestScore: { type: Number, default: 0 } // Add this line
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

