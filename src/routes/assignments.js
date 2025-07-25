const express = require('express');
const {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
} = require('../controllers/assignmentController');
const { protect, requireManager, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/assignments - Both managers and engineers can view (filtered by role in controller)
router.get('/', protect, requireRole(['manager', 'engineer']), getAssignments);

// POST /api/assignments - Manager only
router.post('/', protect, requireManager, createAssignment);

// PUT /api/assignments/:id - Manager only
router.put('/:id', protect, requireManager, updateAssignment);

// DELETE /api/assignments/:id - Manager only
router.delete('/:id', protect, requireManager, deleteAssignment);

module.exports = router; 