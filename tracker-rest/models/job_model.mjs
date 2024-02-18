import mongoose from 'mongoose';

// Schema for mongo database for jobs
const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['Full Time', 'Part-time', 'Internship'],
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  jobPostingLink: {
    type: String,
    required: false,
  },
  pay: {
    type: String,
    required: false,
  },
  applyDate: {
    type: Date,
    default: Date.now,
    required: false,
    // get: v => v ? v.toISOString().split('T')[0] : null // Format applyDate to ISO string without time part
  },
  jobStatus: {
    type: String,
    required: false,
    enum: ['Open', 'Closed', 'Pending'],
  },
  interviewed: {
    type: String,
    required: false,
    enum: ['Yes', 'No', 'Pending'],
  },
  interviewDate: {
    type: Date,
    required: false,
  },
  decision: {
    type: String,
    required: false,
    enum: ['Pending', 'Rejected', 'Hired', 'Other'],
  },
  requiredSkills: [{
    type: String,
    required: false,
  }],
  notes: {
    type: String,
  },
});

export default mongoose.model('Jobs', jobSchema);
