const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    let accessToken = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.split(" ")[1];
    }

    if (!accessToken) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);

    const user = await UserModel.findOne({ email: decoded.email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.email = decoded.email;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;