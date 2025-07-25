const express = require('express');
const { login, profile, loginManager, loginEngineer } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/profile
router.get('/profile', protect, profile);

// POST /api/auth/login/manager
router.post('/login/manager', loginManager);

// POST /api/auth/login/engineer
router.post('/login/engineer', loginEngineer);

module.exports = router; 