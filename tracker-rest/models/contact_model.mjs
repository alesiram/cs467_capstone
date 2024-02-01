import mongoose from 'mongoose';

// Schema for mongo database for contacts
const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumbers: [{
        number: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Mobile', 'Work', 'Home', 'Other'],
            default: 'Mobile'
        }
    }],
    notes: {
        type: String
    },
    contactType: {
        type: String,
        enum: ['Recruiter', 'Peer', 'Mentor', 'Alumni', 'Company Representative', 'Other'],
        required: true
    },
    interactionType: {
        type: String,
        enum: ['Email', 'LinkedIn', 'In-person', 'Phone call', 'Online event', 'Other']
    },
    sourceOfContact: {
        type: String,
        enum: ['Job Fair', 'Referral', 'LinkedIn', 'Company Website', 'Networking Event', 'Other']
    },
    statusOfInteraction: {
        type: String,
        enum: ['Awaiting Response', 'In Discussion', 'Need to Follow Up', 'Closed', 'Other']
    },
    strengthOfConnection: {
        type: Number,
        min: 1,
        max: 5
    },
    referralPotential: {
        type: Boolean
    },
    preferredContactMethod: {
        type: String,
        enum: ['Email', 'Phone', 'LinkedIn', 'Other']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    followUpDate: {
        type: Date
    },
    lastContactedDate: {
        type: Date
    }
});

export default mongoose.model('Contacts', contactSchema);