const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/assignments');
const engineerRoutes = require('./routes/engineers');
const managerRoutes = require('./routes/manager');
const analyticsRoutes = require('./routes/analytics');


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