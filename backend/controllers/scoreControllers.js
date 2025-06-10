const Score = require('../models/scoreModel');
const User = require('../models/userModel');

// Save a user's score
const saveScore = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user.id; // Assuming this is set correctly

    

    if (score < 0) {
      return res.status(400).json({ success: false, message: 'Invalid score' });
    }

    // Find the user's current score
    let userScore = await Score.findOne({ user: userId });
    let user = await User.findById(userId); // Fetch the user to update highestScore


    if (userScore) {
      if (score > userScore.score) {
        userScore.score = score;
        await userScore.save();
        // Update user's highestScore if current score is higher
        if (user && score > user.highestScore) {
          user.highestScore = score;
          await user.save();
        }
        return res.status(200).json({ success: true, message: 'Score updated successfully', score: userScore.score });
      } else {
        return res.status(200).json({ success: true, message: 'Score not higher than existing record', score: userScore.score });
      }
    } else {
      const newScore = await Score.create({
        user: userId,
        score: score,
      });
      // For a new score, also update user's highestScore
      if (user) {
        user.highestScore = score;
        await user.save();
      }
      return res.status(201).json({ success: true, message: 'Score saved successfully', score: newScore.score });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Get top 10 scores for leaderboard
const getTop10Scores = async (req, res) => {
  try {
    const leaderboard = await Score.find()
      .sort({ score: -1, createdAt: 1 }) // Sort by score descending, then by date ascending for ties
      .limit(10)
      .populate('user', 'name') // Populate user field and select only 'name' instead of 'username'
      .select('score createdAt'); // Select score and createdAt fields

    res.status(200).json({ success: true, data: leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Placeholder for getUserHighestScore, assuming it exists or will be implemented
const getUserHighestScore = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user.id is set by authMiddleware

    const user = await User.findById(userId).select('highestScore');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, highestScore: user.highestScore || 0 });
  } catch (error) {
    console.error('Error fetching user highest score:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = { saveScore, getTop10Scores, getUserHighestScore };