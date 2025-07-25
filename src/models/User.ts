import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    role: 'engineer' | 'manager';
    skills?: string[];
    seniorityLevel?: 'junior' | 'mid' | 'senior' | 'lead';
    employmentType?: 'full-time' | 'part-time';
    capacity?: number;
    department?: string;
    joinDate?: Date;
    password: string;
}

const UserSchema: Schema = new Schema({
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

export default mongoose.model<IUser>('User', UserSchema); 