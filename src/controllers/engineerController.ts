import { Request, Response } from 'express';
import User from '../models/User';
import Assignment from '../models/Assignment';
import { AuthRequest } from '../middleware/authMiddleware';

export const getEngineers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { skill } = req.query;
        let filter: any = { role: 'engineer' };
        if (skill) filter.skills = { $in: [skill] };
        const engineers = await User.find(filter).select('-password');

        // Normalize data format for frontend consistency
        const normalizedEngineers = engineers.map(engineer => ({
            id: engineer._id,
            name: engineer.name,
            email: engineer.email,
            skills: engineer.skills || [],
            seniorityLevel: engineer.seniorityLevel || 'junior',
            employmentType: engineer.employmentType || 'full-time',
            capacity: engineer.capacity || 100,
            currentAllocation: 0, // Will be calculated by frontend
            joinDate: engineer.joinDate?.toISOString() || new Date().toISOString(),
            department: engineer.department
        }));

        res.json(normalizedEngineers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getEngineerCapacity = async (req: Request, res: Response): Promise<void> => {
    try {
        const engineer = await User.findById(req.params.id);
        if (!engineer || engineer.role !== 'engineer') {
            res.status(404).json({ message: 'Engineer not found' });
            return;
        }
        const assignments = await Assignment.find({ engineerId: engineer._id });
        const totalAllocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
        const available = (engineer.capacity || 0) - totalAllocated;
        res.json({ allocated: totalAllocated, available });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createEngineer = async (req: Request, res: Response): Promise<void> => {
    try {
        const engineer = await User.create({ ...req.body, role: 'engineer' });
        res.status(201).json(engineer);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

export const updateEngineer = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const targetEngineerId = req.params.id;
        const currentUser = req.user;
        
        if (!currentUser) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        // Check if the user is trying to update their own profile OR if they're a manager
        const isUpdatingOwnProfile = currentUser.id === targetEngineerId;
        const isManager = currentUser.role === 'manager';
        
        if (!isUpdatingOwnProfile && !isManager) {
            res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
            return;
        }

        // Verify the target user exists and is an engineer
        const targetEngineer = await User.findById(targetEngineerId);
        if (!targetEngineer || targetEngineer.role !== 'engineer') {
            res.status(404).json({ message: 'Engineer not found' });
            return;
        }

        // Define what fields different roles can update
        const managerAllowedFields = ['name', 'email', 'skills', 'seniorityLevel', 'employmentType', 'capacity', 'department'];
        const engineerAllowedFields = ['name', 'email', 'skills', 'seniorityLevel', 'department'];
        
        const updateData: any = {};
        const allowedFields = isManager ? managerAllowedFields : engineerAllowedFields;
        
        // Filter request body to only include allowed fields
        Object.keys(req.body).forEach(key => {
            if (allowedFields.includes(key)) {
                updateData[key] = req.body[key];
            }
        });

        const engineer = await User.findByIdAndUpdate(targetEngineerId, updateData, { new: true }).select('-password');
        if (!engineer) {
            res.status(404).json({ message: 'Engineer not found' });
            return;
        }
        
        res.json(engineer);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

export const deleteEngineer = async (req: Request, res: Response): Promise<void> => {
    try {
        const engineer = await User.findByIdAndDelete(req.params.id);
        if (!engineer) {
            res.status(404).json({ message: 'Engineer not found' });
            return;
        }
        res.json({ message: 'Engineer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}; 