import Job from '../models/job_model.mjs';
import Skill from '../models/skill_model.mjs';

// Create a new job
export const createJob = async (req, res) => {
  try {
    let requiredSkillIds = null; // Initialize array to store required skill ObjectIds

    // // Check if required skills are provided and exist
    if (req.body.requiredSkills) {
      const requiredSkillsName = req.body.requiredSkills.map(skill => skill.label);
      const requiredSkillsIds = req.body.requiredSkills.map(skill => skill.value);

      const skillsExist = await Skill.find({ name: { $in: requiredSkillsName }, user: req.user._id })
      const filteredSkils = skillsExist.filter(skill => requiredSkillsIds.includes(skill._id.toString()))

      // Check if all required skills exist
      if (filteredSkils.length !== requiredSkillsName.length) {
        const missingSkills = requiredSkillsName.filter(skill => !filteredSkils.some(existingSkill => existingSkill.name === skill));
        return res.status(400).json({ message: `One or more required skills do not exist: ${missingSkills.join(', ')}` });
      }

      // Store the ObjectIds of the existing required skills
      requiredSkillIds = filteredSkils.map(skill => skill._id);
    }

    const newJob = new Job({
      ...req.body,
      user: req.user._id,
      requiredSkills: requiredSkillIds, // Store the ObjectId(s) of the required skills
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
    // Find all jobs and populate the 'requiredSkills' field with skill details
    const jobs = await Job.find({ user: req.user._id }).populate('requiredSkills', 'name -_id');

    // Send all jobs with populated required skills
    res.status(200).json(jobs);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: error.message });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    let requiredSkillIds = null; // Initialize array to store required skill ObjectIds

    // // Check if required skills are provided and exist
    if (req.body.requiredSkills) {
      const requiredSkills = req.body.requiredSkills.map(skill => skill.label);
      const requiredSkillsIds = req.body.requiredSkills.map(skill => skill.value);
      
      const skillsExist = await Skill.find({ name: { $in: requiredSkills }, user: req.user._id });
      const filteredSkils = skillsExist.filter(skill => requiredSkillsIds.includes(skill._id.toString()))

      // Check if all required skills exist
      if (filteredSkils.length !== requiredSkills.length) {
        const missingSkills = requiredSkills.filter(skill => !filteredSkils.some(existingSkill => existingSkill.name === skill));
        return res.status(400).json({ message: `One or more required skills do not exist: ${missingSkills.join(', ')}` });
      }

      // Store the ObjectIds of the existing required skills
      requiredSkillIds = filteredSkils.map(skill => skill._id);
    }
    // Find job from route param :_id, and update the job
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {...req.body, requiredSkills: requiredSkillIds },
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