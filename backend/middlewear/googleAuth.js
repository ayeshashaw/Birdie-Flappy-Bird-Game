const generateToken = require("../controllers/googleAuthControllers");
const UserModel = require("../models/userModel");

const googleAuth = async (req, res) => {
  try {
    const profile = req.user?._json;

    if (!profile || !profile.email) {
      return res.status(400).json({ message: "Invalid Google user profile data." });
    }

    const email = profile.email;
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        name: profile.name,
        email: email,
      });
      try {
        await user.save();
      } catch (saveError) {
        if (saveError.code === 11000) {
          user = await UserModel.findOne({ email });
        } else {
          throw saveError;
        }
      }
    }

    const accessToken = generateToken(user.email);
    res.redirect(`http://localhost:5173/auth-success?token=${encodeURIComponent(accessToken)}`);
  } catch (error) {
    console.error("Google Auth Middleware Error:", error);
    res.redirect(`http://localhost:5173?error=auth_failed`);
  }
};

module.exports = googleAuth;
