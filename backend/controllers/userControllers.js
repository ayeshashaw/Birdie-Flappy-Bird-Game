const UserModel = require("../models/userModel");
const sendEmail = require("../utils/sendMail");

const getUser = async (req, res, next) => {
  const email = req.email;

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    res.status(200).json({
      message: "success",
      status: true,
      user: {
        name: foundUser.name,
        email: foundUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      const error = new Error("Incorrect email");
      error.statusCode = 400;
      throw error;
    }

    const otpData = foundUser.password_otp || {};
    const now = Date.now();
    const lastAttempt = otpData.last_attempt ? new Date(otpData.last_attempt).getTime() : 0;
    const timeSinceLastAttempt = now - lastAttempt;

    // Reset daily limit if 24 hours have passed
    if (timeSinceLastAttempt > 24 * 60 * 60 * 1000) {
      otpData.limit = 5;
    }

    // Enforce daily limit
    if (otpData.limit === 0) {
      const error = new Error("Daily limit reached");
      error.statusCode = 429;
      throw error;
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Update OTP data
    otpData.otp = otp;
    otpData.last_attempt = new Date();
    otpData.send_time = new Date(now + 2 * 60 * 1000); // valid for 2 minutes
    otpData.limit = (otpData.limit || 5) - 1;

    foundUser.password_otp = otpData;
    await foundUser.save();

    await sendEmail({ email: foundUser.email, otp });

    res.status(200).json({
      message: `OTP sent to ${email}`,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};


const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;

  try {
    const foundUser = await UserModel.findOne({ "password_otp.otp": otp });

    if (!foundUser) {
      const error = new Error("Incorrect OTP");
      error.statusCode = 400;
      throw error;
    }

    const isExpired = new Date(foundUser.password_otp.send_time).getTime() < Date.now();

    if (isExpired) {
      const error = new Error("OTP expired");
      error.statusCode = 400;
      throw error;
    }

    // Optionally, clear the OTP after successful verification
    foundUser.password_otp.otp = null;
    await foundUser.save();

    res.status(200).json({
      message: "OTP verified",
      status: true,
    });

  } catch (error) {
    next(error);
  }
};


module.exports = { getUser, forgotPassword ,verifyOtp};
