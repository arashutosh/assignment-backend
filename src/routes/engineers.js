const express = require('express');
const { getEngineers, getEngineerCapacity, createEngineer, updateEngineer, deleteEngineer } = require('../controllers/engineerController');
const { protect, requireManager, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/engineers - Both managers and engineers can view
router.get('/', protect, requireRole(['manager', 'engineer']), getEngineers);

// GET /api/engineers/:id/capacity - Manager only
router.get('/:id/capacity', protect, requireManager, getEngineerCapacity);

// POST /api/engineers - Manager only
router.post('/', protect, requireManager, createEngineer);

// PUT /api/engineers/:id - Engineers can update own profile, managers can update any
router.put('/:id', protect, updateEngineer);

// DELETE /api/engineers/:id - Manager only
router.delete('/:id', protect, requireManager, deleteEngineer);

module.exports = router; 