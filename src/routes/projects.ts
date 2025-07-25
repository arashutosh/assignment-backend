import express from 'express';
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
} from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/projects
router.get('/', protect, getProjects);

// GET /api/projects/:id
router.get('/:id', protect, getProjectById);

// POST /api/projects
router.post('/', protect, createProject);

// PUT /api/projects/:id
router.put('/:id', protect, updateProject);

export default router; 