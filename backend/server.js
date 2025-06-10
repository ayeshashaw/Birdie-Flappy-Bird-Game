require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
const googleAuth = require("./middlewear/googleAuth");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middlewear/errorHandler");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();

app.use(
  cors({
    origin: "https://birdie-flappy-bird-game.vercel.app",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Passport middleware
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://birdie-flappy-bird-game.onrender.com/auth/google/callback", // Use prod value in deployment
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// ✅ Instead of redirecting, send token JSON response
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false, 
    failureRedirect: "https://birdie-flappy-bird-game.vercel.app",
  }),
  googleAuth 
);

app.get("/success", (req, res) => res.send("Login Successful!"));
app.get("/failure", (req, res) => res.send("Login Failed!"));

app.use("/users", userRouter);
app.use("/api/scores", scoreRoutes);

app.use(errorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
