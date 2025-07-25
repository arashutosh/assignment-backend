const User = require('../models/User');
const Assignment = require('../models/Assignment');
const Project = require('../models/Project');

// Team utilization: average allocation across all engineers
const teamUtilization = async (_req, res) => {
    try {
        const engineers = await User.find({ role: 'engineer' });
        const utilization = await Promise.all(engineers.map(async (eng) => {
            const assignments = await Assignment.find({ engineerId: eng._id });
            const allocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
            return eng.capacity ? allocated / eng.capacity : 0;
        }));
        const avgUtilization = utilization.length ? (utilization.reduce((a, b) => a + b, 0) / utilization.length) : 0;
        res.json({ avgUtilization });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Skill gap analysis: for each project, list missing skills in the team
const skillGapAnalysis = async (_req, res) => {
    try {
        const projects = await Project.find();
        const engineers = await User.find({ role: 'engineer' });
        const teamSkills = new Set(engineers.flatMap(e => e.skills || []));
        const gaps = projects.map(project => {
            const missing = (project.requiredSkills || []).filter(skill => !teamSkills.has(skill));
            return {
                project: project.name,
                missingSkills: missing,
            };
        });
        res.json(gaps);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Assignment timeline: for each engineer, list assignments with start/end dates
const assignmentTimeline = async (_req, res) => {
    try {
        const engineers = await User.find({ role: 'engineer' });
        const timeline = await Promise.all(engineers.map(async (eng) => {
            const assignments = await Assignment.find({ engineerId: eng._id })
                .populate('projectId', 'name')
                .sort({ startDate: 1 });
            return {
                engineer: eng.name,
                assignments: assignments.map(a => ({
                    project: a.projectId.name,
                    startDate: a.startDate,
                    endDate: a.endDate,
                    allocation: a.allocationPercentage,
                    role: a.role,
                })),
            };
        }));
        res.json(timeline);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    teamUtilization,
    skillGapAnalysis,
    assignmentTimeline
}; 