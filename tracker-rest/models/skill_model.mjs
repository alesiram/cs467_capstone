const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reference: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // New field
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;