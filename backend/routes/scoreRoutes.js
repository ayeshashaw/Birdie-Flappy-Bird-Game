const express = require('express');
const router = express.Router();
const { saveScore, getTop10Scores, getUserHighestScore } = require('../controllers/scoreControllers');
const auth = require('../middlewear/authMiddlewear');

router.post('/save', auth, saveScore);
router.get('/top10', getTop10Scores); // New route for fetching top 10 scores
router.get('/my-highest', auth, getUserHighestScore);

module.exports = router;
