import express from 'express';
import { teamUtilization, skillGapAnalysis, assignmentTimeline } from '../controllers/analyticsController';
import { protect, requireManager } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/analytics/team-utilization - Manager only
router.get('/team-utilization', protect, requireManager, teamUtilization);

// GET /api/analytics/skill-gap - Manager only
router.get('/skill-gap', protect, requireManager, skillGapAnalysis);

// GET /api/analytics/assignment-timeline - Manager only
router.get('/assignment-timeline', protect, requireManager, assignmentTimeline);

export default router; 