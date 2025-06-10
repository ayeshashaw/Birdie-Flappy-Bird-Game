import React from "react";
import { Routes, Route } from "react-router-dom";
import UpdatePassword from "./components/pages/UpdatePassword";
import Register from "./components/pages/Register";
import OtpVerify from "./components/pages/OtpVerify";
import ForgetPassword from "./components/pages/ForgetPassword";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Add this import
import LeaderboardPage from "./components/pages/LeaderboardPage";
import Notfound from "./components/pages/Notfound";
import Footer from "./components/Footer";
import AuthSuccess from "./components/pages/AuthSucess";

function App() {
  return (
    <>
      <Routes>
        {/* playbg( */}
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/update/password" element={<UpdatePassword />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        {/* Protected route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;