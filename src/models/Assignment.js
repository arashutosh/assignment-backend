const mongoose = require('mongoose');
const { Schema } = mongoose;

const AssignmentSchema = new Schema({
  engineerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  allocationPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model('Assignment', AssignmentSchema); 