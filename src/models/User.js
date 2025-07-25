const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['engineer', 'manager'], required: true },
    skills: [{ type: String }],
    seniorityLevel: { type: String, enum: ['junior', 'mid', 'senior', 'lead'] },
    employmentType: { type: String, enum: ['full-time', 'part-time'], default: 'full-time' },
    capacity: { type: Number, default: 100 },
    department: { type: String },
    joinDate: { type: Date, default: Date.now },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema); 