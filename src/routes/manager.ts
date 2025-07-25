import express from 'express';
import { teamOverview } from '../controllers/managerController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/manager/team-overview
router.get('/team-overview', protect, teamOverview);

export default router; 