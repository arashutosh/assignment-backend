const express = require('express');
const { teamUtilization, skillGapAnalysis, assignmentTimeline } = require('../controllers/analyticsController');
const { protect, requireManager } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/analytics/team-utilization - Manager only
router.get('/team-utilization', protect, requireManager, teamUtilization);

// GET /api/analytics/skill-gap - Manager only
router.get('/skill-gap', protect, requireManager, skillGapAnalysis);

// GET /api/analytics/assignment-timeline - Manager only
router.get('/assignment-timeline', protect, requireManager, assignmentTimeline);

module.exports = router; 