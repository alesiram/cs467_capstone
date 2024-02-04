// CREATED BY GPT 4.0

import Skill from '../models/skill_model.mjs'; // Adjust the path as necessary

// Create a new skill
export const createSkill = async (req, res) => {
    try {
        const newSkill = new Skill({
            ...req.body,
            user: req.user._id // Set the user ID from the authenticated user
        });
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all skills for the authenticated user
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ user: req.user._id });
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to retrieve a specific skill for the authenticated user
export const getSkill = async (req, res) => {
  try {
      const skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });
      if (!skill) {
          return res.status(404).json({ message: 'Skill not found' });
      }
      res.status(200).json(skill);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Update a skill
export const updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found to delete' });
        }
        res.status(200).json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
