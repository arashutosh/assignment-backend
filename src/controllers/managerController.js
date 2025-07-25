const User = require('../models/User');
const Assignment = require('../models/Assignment');

const teamOverview = async (_req, res) => {
    try {
        const engineers = await User.find({ role: 'engineer' }).select('-password');
        const overview = await Promise.all(engineers.map(async (eng) => {
            const assignments = await Assignment.find({ engineerId: eng._id });
            const allocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
            const available = (eng.capacity || 0) - allocated;
            return {
                id: eng._id,
                name: eng.name,
                skills: eng.skills,
                seniorityLevel: eng.seniorityLevel,
                capacity: eng.capacity,
                allocated,
                available,
                status: allocated >= (eng.capacity || 0) ? 'overloaded' : (allocated <= ((eng.capacity || 0) * 0.5) ? 'underutilized' : 'normal'),
            };
        }));
        res.json(overview);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    teamOverview
}; 