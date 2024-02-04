import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    reference: { // Changed from 'contact' to a simple string 'reference'
        type: String,
        required: true
    }
});

export default mongoose.model('Skill', skillSchema);
