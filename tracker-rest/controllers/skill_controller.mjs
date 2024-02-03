// CREATED BY GPT 4.0

const Skill = require('../models/skill_model.mjs'); // Adjust the path as necessary

// Create a new skill
exports.createSkill = async (req, res) => {
    try {
      const { title, rating, reference } = req.body;
      const newSkill = new Skill({
        title,
        rating,
        reference,
        user: req.user.id // Assuming middleware sets req.user
      });
      await newSkill.save();
      res.status(201).json(newSkill);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate('reference');
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single skill by id
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate('reference');
    if (skill) {
      res.status(200).json(skill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const { title, rating, reference } = req.body;
    const skill = await Skill.findByIdAndUpdate(req.params.id, {
      title,
      rating,
      reference
    }, { new: true }); // Return the updated document
    if (skill) {
      res.status(200).json(skill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (skill) {
      res.status(200).json({ message: 'Skill deleted successfully' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};