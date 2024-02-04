// CREATED BY GPT 4.0

import React, { useState, useEffect } from 'react';

const EditSkillModal = ({ skill, onClose, onSave }) => {
  const [editSkill, setEditSkill] = useState(skill);

  useEffect(() => {
    setEditSkill(skill); // This will reset the form with the new skill when the skill prop changes
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSkill({ ...editSkill, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editSkill);
    onClose(); // Close the modal after save
  };

  return (
    <div className="skills-modal edit-skills-modal">
      <div className="skills-modal-content">
        <h2>Edit Skill</h2>
        <span className="skills-modal-close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={editSkill.name} onChange={handleChange} required />
          </label>
          <label>
            Rating:
            <input type="number" name="rating" min="1" max="5" value={editSkill.rating} onChange={handleChange} required />
          </label>
          <label>
            Reference:
            <input type="text" name="reference" value={editSkill.reference} onChange={handleChange} required />
          </label>
          <div className="skills-modal-actions">
            <button type="submit" className="skills-modal-button edit">Save Changes</button>
            <button type="button" className="skills-modal-button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSkillModal;

