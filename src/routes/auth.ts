import express from 'express';
import { login, profile, loginManager, loginEngineer } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/profile
router.get('/profile', protect, profile);

// POST /api/auth/login/manager
router.post('/login/manager', loginManager);

// POST /api/auth/login/engineer
router.post('/login/engineer', loginEngineer);

export default router; 