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
    required: true,
  },
  type: {
    type: String,
    enum: ['Full Time', 'Part-time', 'Internship'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobPostingLink: {
    type: String,
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
  applyDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'Closed', 'Other'],
  },
  interviewed: {
    type: String,
    required: true,
    enum: ['Yes', 'No'],
  },
  interviewDate: {
    type: Date,
  },
  decision: {
    type: String,
    required: true,
    enum: ['Pending', 'Rejected', 'Hired', 'Other'],
  },
  requiredSkills: [{
    type: String,
    required: true,
  }],
  notes: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Jobs', jobSchema);
