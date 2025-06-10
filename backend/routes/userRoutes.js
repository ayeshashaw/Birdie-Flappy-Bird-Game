const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/authControllers");
const {getUser, forgotPassword, verifyOtp} = require("../controllers/userControllers");
const auth = require("../middlewear/authMiddlewear");

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/get-user",auth, getUser)
userRouter.post("/logout",auth, logout)
userRouter.post("/forget",forgotPassword)
userRouter.post("/otp/verify",verifyOtp)









module.exports = userRouter;