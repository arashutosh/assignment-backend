import { Request, Response } from 'express';
import Project from '../models/Project';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status, skill } = req.query;
        let filter: any = {};
        if (status) filter.status = status;
        if (skill) filter.requiredSkills = { $in: [skill] };
        const projects = await Project.find(filter);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
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

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
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