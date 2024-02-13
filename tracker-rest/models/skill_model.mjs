import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Every skill must be linked to a user.
    },
    name: {
        type: String,
        required: true, // Name of the skill is required.
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true, // Rating is required, must be between 1 and 5.
    },
    reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contacts',
        required: false, // Reference to a Contact is optional.
    }
});

export default mongoose.model('Skill', skillSchema);