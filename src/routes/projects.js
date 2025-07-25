const express = require('express');
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/projects
router.get('/', protect, getProjects);

// GET /api/projects/:id
router.get('/:id', protect, getProjectById);

// POST /api/projects
router.post('/', protect, createProject);

// PUT /api/projects/:id
router.put('/:id', protect, updateProject);

module.exports = router; 