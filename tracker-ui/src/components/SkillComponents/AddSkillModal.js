// CREATED BY GPT 4.0

import React, { useState } from 'react';

const AddSkillModal = ({ onClose, onSave }) => {
  const [newSkill, setNewSkill] = useState({
    name: '',
    rating: '',
    reference: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newSkill);
    onClose(); // Close the modal after save
  };

  return (
    <div className="skills-modal add-skills-modal">
      <div className="skills-modal-content">
        <h2>Add New Skill</h2>
        <span className="skills-modal-close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={newSkill.name} onChange={handleChange} required />
          </label>
          <label>
            Rating:
            <input type="number" name="rating" min="1" max="5" value={newSkill.rating} onChange={handleChange} required />
          </label>
          <label>
            Reference:
            <input type="text" name="reference" value={newSkill.reference} onChange={handleChange} required />
          </label>
          <div className="skills-modal-actions">
            <button type="submit" className="skills-modal-button add">Add</button>
            <button type="button" className="skills-modal-button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;

