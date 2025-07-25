import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import assignmentRoutes from './routes/assignments';
import engineerRoutes from './routes/engineers';
import managerRoutes from './routes/manager';
import analyticsRoutes from './routes/analytics';


// Connect to MongoDB
connectDB();

const app = express();

// Most permissive CORS config
app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/engineers', engineerRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check route
app.get('/', (_req, res) => {
    res.send('Engineering Resource Management System API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 