const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    requiredSkills: [{ type: String, required: true }],
    requiredTeamSize: { type: Number, required: true },
    status: { type: String, enum: ['planning', 'active', 'completed'], required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    managerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Project', ProjectSchema); 