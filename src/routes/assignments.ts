import express from 'express';
import {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
} from '../controllers/assignmentController';
import { protect, requireManager, requireRole } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/assignments - Both managers and engineers can view (filtered by role in controller)
router.get('/', protect, requireRole(['manager', 'engineer']), getAssignments);

// POST /api/assignments - Manager only
router.post('/', protect, requireManager, createAssignment);

// PUT /api/assignments/:id - Manager only
router.put('/:id', protect, requireManager, updateAssignment);

// DELETE /api/assignments/:id - Manager only
router.delete('/:id', protect, requireManager, deleteAssignment);

export default router; 