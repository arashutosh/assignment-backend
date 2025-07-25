const Project = require('../models/Project');

const getProjects = async (req, res) => {
    try {
        const { status, skill } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (skill) filter.requiredSkills = { $in: [skill] };
        const projects = await Project.find(filter);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json(project);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject
}; 