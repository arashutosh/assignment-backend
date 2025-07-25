import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Assignment from '../models/Assignment';
import User from '../models/User';
import Project from '../models/Project';

dotenv.config();

const assignments = async () => {
    const engineers = await User.find({ role: 'engineer' });
    const projects = await Project.find();
    if (engineers.length < 4 || projects.length < 4) throw new Error('Not enough engineers or projects');

    // Sort projects and engineers by name for consistent assignment
    projects.sort((a, b) => a.name.localeCompare(b.name));
    engineers.sort((a, b) => a.name.localeCompare(b.name));

    return [
        // E-Commerce Platform Redesign assignments
        {
            engineerId: engineers[0]._id, // Bob Johnson (Senior, Full-time, React/TS/Node)
            projectId: projects[2]._id, // E-Commerce Platform Redesign
            allocationPercentage: 80,
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-04-30'),
            role: 'Tech Lead',
        },
        {
            engineerId: engineers[3]._id, // Emma Davis (Junior, Full-time, React/Vue/JS)
            projectId: projects[2]._id, // E-Commerce Platform Redesign  
            allocationPercentage: 90,
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-04-30'),
            role: 'Frontend Developer',
        },

        // Microservices Migration assignments
        {
            engineerId: engineers[2]._id, // David Wilson (Lead, Full-time, Java/Spring)
            projectId: projects[0]._id, // Microservices Migration
            allocationPercentage: 70,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-07-15'),
            role: 'Architecture Lead',
        },

        // Analytics Dashboard assignments
        {
            engineerId: engineers[1]._id, // Carol Smith (Mid, Part-time, Python/Django)
            projectId: projects[1]._id, // Analytics Dashboard
            allocationPercentage: 50,
            startDate: new Date('2024-03-01'),
            endDate: new Date('2024-05-31'),
            role: 'Backend Developer',
        },
        {
            engineerId: engineers[0]._id, // Bob Johnson (Senior, React skills)
            projectId: projects[1]._id, // Analytics Dashboard
            allocationPercentage: 20,
            startDate: new Date('2024-03-15'),
            endDate: new Date('2024-05-31'),
            role: 'Frontend Consultant',
        },

        // Mobile App Testing Suite assignment
        {
            engineerId: engineers[3]._id, // Emma Davis (Junior, Testing/Vue skills)
            projectId: projects[3]._id, // Mobile App Testing Suite
            allocationPercentage: 10,
            startDate: new Date('2024-04-01'),
            endDate: new Date('2024-06-30'),
            role: 'QA Engineer',
        },

        // Additional cross-project assignments
        {
            engineerId: engineers[2]._id, // David Wilson (Lead, available capacity)
            projectId: projects[1]._id, // Analytics Dashboard
            allocationPercentage: 10,
            startDate: new Date('2024-03-01'),
            endDate: new Date('2024-04-15'),
            role: 'Technical Advisor',
        },
        {
            engineerId: engineers[2]._id, // David Wilson (Lead, mentoring junior)
            projectId: projects[2]._id, // E-Commerce Platform Redesign
            allocationPercentage: 20,
            startDate: new Date('2024-02-15'),
            endDate: new Date('2024-03-31'),
            role: 'Senior Mentor',
        },
    ];
};

const seedAssignments = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        await Assignment.deleteMany();
        const assignmentData = await assignments();
        await Assignment.insertMany(assignmentData);
        console.log('Assignments seeded');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAssignments(); 