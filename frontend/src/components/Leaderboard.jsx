import React, { useState, useEffect } from "react";
import "./pages/style/Leaderboard.css";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch(`http://localhost:3000/api/scores/top10`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch leaderboard: ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data.success) {
          setScores(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch leaderboard data");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-loading">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Top 10 Players 🏆</h2>
      <div className="leaderboard-header">
        <span className="rank">
          <img src="/bird.png" alt="bird " width={30} height={30} />
        </span>
        <span className="username">Player</span>
        <span className="score">Score</span>
        <span className="date">Date</span>
      </div>
      <div className="leaderboard-scores">
        {scores.length > 0 ? (
          scores
            .filter(
              (entry) =>
                entry.user &&
                entry.user.name &&
                entry.score !== undefined &&
                entry.createdAt
            )
            .map((entry, index) => (
              <div key={entry._id} className="leaderboard-entry">
                <span className="rank">{index + 1}</span>
                <span className="username">{entry.user.name}</span>
                <span className="score">{entry.score}</span>
                <span className="date">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
        ) : (
          <div className="leaderboard-no-data">
            No scores available yet. Play to get on the leaderboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
