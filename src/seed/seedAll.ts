import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Project from '../models/Project';
import Assignment from '../models/Assignment';

dotenv.config();

// Users seed data
const users = [
    {
        email: 'manager1@example.com',
        name: 'Alice Manager',
        role: 'manager',
        password: 'password123',
        department: 'Engineering',
        joinDate: new Date('2022-01-15'),
    },
    {
        email: 'engineer1@example.com',
        name: 'Bob Johnson',
        role: 'engineer',
        skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
        seniorityLevel: 'senior',
        employmentType: 'full-time',
        capacity: 100,
        department: 'Frontend',
        password: 'password123',
        joinDate: new Date('2021-03-10'),
    },
    {
        email: 'engineer2@example.com',
        name: 'Carol Smith',
        role: 'engineer',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        seniorityLevel: 'mid',
        employmentType: 'part-time',
        capacity: 50,
        department: 'Backend',
        password: 'password123',
        joinDate: new Date('2022-08-20'),
    },
    {
        email: 'engineer3@example.com',
        name: 'David Wilson',
        role: 'engineer',
        skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes'],
        seniorityLevel: 'lead',
        employmentType: 'full-time',
        capacity: 80,
        department: 'Backend',
        password: 'password123',
        joinDate: new Date('2020-05-15'),
    },
    {
        email: 'engineer4@example.com',
        name: 'Emma Davis',
        role: 'engineer',
        skills: ['React', 'Vue.js', 'JavaScript', 'Testing'],
        seniorityLevel: 'junior',
        employmentType: 'full-time',
        capacity: 100,
        department: 'Frontend',
        password: 'password123',
        joinDate: new Date('2023-09-01'),
    },
];

const createProjects = async (managerId: string) => {
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
            managerId: managerId,
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
            managerId: managerId,
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
            managerId: managerId,
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
            managerId: managerId,
        },
    ];
};

const createAssignments = async () => {
    const engineers = await User.find({ role: 'engineer' }).sort({ name: 1 });
    const projects = await Project.find().sort({ name: 1 });

    if (engineers.length < 4 || projects.length < 4) {
        throw new Error('Not enough engineers or projects');
    }

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

const seedAll = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await Assignment.deleteMany({});
        await Project.deleteMany({});
        await User.deleteMany({});
        console.log('✅ Existing data cleared');

        // Seed Users
        console.log('👥 Seeding users...');
        const hashedUsers = await Promise.all(
            users.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
            }))
        );
        await User.insertMany(hashedUsers);
        console.log('✅ Users seeded successfully');

        // Seed Projects
        console.log('📊 Seeding projects...');
        const manager = await User.findOne({ role: 'manager' });
        if (!manager) throw new Error('No manager found');

        const projectData = await createProjects((manager._id as any).toString());
        await Project.insertMany(projectData);
        console.log('✅ Projects seeded successfully');

        // Seed Assignments
        console.log('📝 Seeding assignments...');
        const assignmentData = await createAssignments();
        await Assignment.insertMany(assignmentData);
        console.log('✅ Assignments seeded successfully');

        console.log('🎉 Database seeding completed successfully!');

        // Print summary
        const userCount = await User.countDocuments();
        const projectCount = await Project.countDocuments();
        const assignmentCount = await Assignment.countDocuments();

        console.log('\n📊 Seeding Summary:');
        console.log(`• Users: ${userCount} (1 manager, ${userCount - 1} engineers)`);
        console.log(`• Projects: ${projectCount}`);
        console.log(`• Assignments: ${assignmentCount}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedAll(); 