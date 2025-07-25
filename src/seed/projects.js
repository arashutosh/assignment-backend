const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/Project');
const User = require('../models/User');

dotenv.config();

const projects = async () => {
    // Find a manager to assign as managerId
    const manager = await User.findOne({ role: 'manager' });
    if (!manager) throw new Error('No manager found');
    return [
        {
            name: 'E-Commerce Platform Redesign',
            description: 'Complete redesign of the e-commerce platform using modern React architecture with TypeScript and improved UX.',
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-04-30'),
            requiredSkills: ['React', 'TypeScript', 'Node.js'],
            requiredTeamSize: 3,
            status: 'active',
            priority: 'high',
            managerId: manager._id,
        },
        {
            name: 'Microservices Migration',
            description: 'Migrate monolithic backend to microservices architecture using Spring Boot and containerization.',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-07-15'),
            requiredSkills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes'],
            requiredTeamSize: 2,
            status: 'planning',
            priority: 'high',
            managerId: manager._id,
        },
        {
            name: 'Analytics Dashboard',
            description: 'Build comprehensive analytics dashboard with real-time data visualization and reporting capabilities.',
            startDate: new Date('2024-03-01'),
            endDate: new Date('2024-05-31'),
            requiredSkills: ['Python', 'Django', 'PostgreSQL', 'React'],
            requiredTeamSize: 2,
            status: 'active',
            priority: 'medium',
            managerId: manager._id,
        },
        {
            name: 'Mobile App Testing Suite',
            description: 'Develop automated testing framework for mobile applications with comprehensive test coverage.',
            startDate: new Date('2024-04-01'),
            endDate: new Date('2024-06-30'),
            requiredSkills: ['JavaScript', 'Testing', 'Vue.js'],
            requiredTeamSize: 1,
            status: 'planning',
            priority: 'low',
            managerId: manager._id,
        },
    ];
};

const seedProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        await Project.deleteMany();
        const projectData = await projects();
        await Project.insertMany(projectData);
        console.log('Projects seeded');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedProjects(); 