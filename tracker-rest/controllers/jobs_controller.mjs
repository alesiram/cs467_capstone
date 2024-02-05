import Job from '../models/job_model.mjs';

// Create a new job
export const createJob = async (req, res) => {
  try {
    // Create job from request body
    const newJob = new Job({
      ...req.body,
      user: req.user._id,
    });
    // Save and send job
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    // Handle error
    res.status(400).json({ message: error.message });
  }
};

// Get a particular job
export const getJob = async (req, res) => {
  try {
    // Find job from route param :_id
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    // If job not found
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    // Send job
    res.status(200).json(job);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs for the authenticated user
export const getJobs = async (req, res) => {
  try {
    // Find all jobs
    const jobs = await Job.find({ user: req.user._id });
    // Send all jobs
    res.status(200).json(jobs);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: error.message });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    // Find job from route param :_id, and update the job
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    // If job not found
    if (!job) {
      return res.status(404).json({ message: 'Job not found to update' });
    }
    // Send updated job
    res.status(200).json(job);
  } catch (error) {
    // Handle error
    res.status(400).json({ message: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    // Find job from route param :_id, and delete the job
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    // If job not found
    if (!job) {
      return res.status(404).json({ message: 'Job not found to delete' });
    }
    // Send message to confirm deletion
    res.status(200).json({ message: 'Job deleted' });
  } catch (error) {
    // Handle error
    res.status(500).json({ message: error.message });
  }
};
