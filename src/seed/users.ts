import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';

dotenv.config();

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

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        await User.deleteMany();
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await User.create({ ...user, password: hashedPassword });
        }
        console.log('Users seeded');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUsers(); 