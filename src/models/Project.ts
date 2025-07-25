import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    requiredSkills: string[];
    requiredTeamSize: number;
    status: 'planning' | 'active' | 'completed';
    priority: 'low' | 'medium' | 'high';
    managerId: Types.ObjectId;
}

const ProjectSchema: Schema = new Schema({
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

export default mongoose.model<IProject>('Project', ProjectSchema); 