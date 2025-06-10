import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import Leaderboard from '../Leaderboard';
import "./style/Leaderboard.css";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="leaderboard-page">
      <button onClick={handleGoBack} className="back-button">
        <IoChevronBack size={20} />
        <span>Back to Game</span>
      </button>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
