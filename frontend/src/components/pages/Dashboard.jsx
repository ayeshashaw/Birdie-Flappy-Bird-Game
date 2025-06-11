import React, { useState, useEffect } from "react";
import httpAction from "../../utils/httpActions";
import apis from "../../utils/apis";
import { Button, Avatar } from "@mui/material";
import { Logout } from "@mui/icons-material";
import "./style/Dashboard.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GameDisplay from "../GameDisplay";
import Footer from "../Footer";
import { CiUser } from "react-icons/ci";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const data = {
          url: apis().userProfile,
          method: "GET",
        };
        const result = await httpAction(data);
        if (result?.success) {
          setUserProfile(result.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast.error("An error occurred while fetching user profile");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const data = {
        url: apis().logout,
        method: "POST",
      };
      await httpAction(data);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* ADD THIS WRAPPER DIV */}
      <div className="dashboard-header">
        {/* Leaderboard Button */}
        <div className="leaderboard-btn-container">
          <button className="leaderboardbtn" onClick={() => navigate("/leaderboard")}>
            🏆 Leaderboard
          </button>
        </div>

        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="profile-header">
            <div className="profile-actions">
              <Button
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Content */}
      <div className="app">
        <h1>Flappy Bird</h1>
        <GameDisplay />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
