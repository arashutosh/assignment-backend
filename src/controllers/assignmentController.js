const Assignment = require('../models/Assignment');
const User = require('../models/User');

// Helper: Calculate available capacity for an engineer
const getAvailableCapacity = async (engineerId) => {
    const engineer = await User.findById(engineerId);
    if (!engineer) return 0;
    const activeAssignments = await Assignment.find({
        engineerId,
        // Optionally filter by current date for active assignments
    });
    const totalAllocated = activeAssignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
    return (engineer.capacity || 0) - totalAllocated;
};

const getAssignments = async (req, res) => {
    try {
        const currentUser = req.user;
        if (!currentUser) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        // Build filter based on user role
        let filter = {};
        if (currentUser.role === 'engineer') {
            // Engineers can only see their own assignments
            filter = { engineerId: currentUser.id };
        }
        // Managers can see all assignments (no filter needed)

        const assignments = await Assignment.find(filter)
            .populate('engineerId', 'name email')
            .populate('projectId', 'name');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createAssignment = async (req, res) => {
    try {
        const { engineerId, allocationPercentage } = req.body;
        const available = await getAvailableCapacity(engineerId);
        if (allocationPercentage > available) {
            res.status(400).json({ message: `Engineer only has ${available}% capacity left` });
            return;
        }
        const assignment = await Assignment.create(req.body);
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

const updateAssignment = async (req, res) => {
    try {
        const { engineerId, allocationPercentage } = req.body;
        const available = await getAvailableCapacity(engineerId);
        // Find the current assignment to exclude its own allocation
        const current = await Assignment.findById(req.params.id);
        const currentAlloc = current ? current.allocationPercentage : 0;
        if (allocationPercentage - currentAlloc > available) {
            res.status(400).json({ message: `Engineer only has ${available + currentAlloc}% capacity left` });
            return;
        }
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assignment) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }
        res.json(assignment);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
}; 