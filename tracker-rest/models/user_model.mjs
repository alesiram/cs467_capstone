import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema for mongo database
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

export default mongoose.model('Users', userSchema);