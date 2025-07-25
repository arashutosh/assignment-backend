const express = require('express');
const { teamOverview } = require('../controllers/managerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/manager/team-overview
router.get('/team-overview', protect, teamOverview);

module.exports = router; 