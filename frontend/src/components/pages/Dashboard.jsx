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
          setUserProfile(result.user); // Change this line
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
      url: apis().logout,  // Ensure your backend has a logout route that clears the cookie
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
      {/* Leaderboard Button at Top Left */}
      <div className="leaderboard-btn-container">
        <button
          className="leaderboardbtn"
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* User Profile Section */}
      <div className="user-profile-section">
        <div className="profile-header">
          {/* <div className="user-email">
            {/* <CiUser size={20} style={{ marginRight: '8px' }} />  */}
          {/* {userProfile?.email} */}
          {/* </div>  */}
          <div></div>
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

      <div className="app">
        <h1>Flappy Bird</h1>
        <GameDisplay />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
