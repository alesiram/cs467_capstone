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
    <div className="modal-backdrop">
      <div className="modal" id="editSkillModal" role="dialog" aria-modal="true" aria-labelledby="editModalTitle">
        <h2 id="editModalTitle">Edit Skill</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
            <label htmlFor="editName">Name:</label>
            <input id="editName" type="text" name="name" value={editSkill.name} onChange={handleChange} required />
            
            <label htmlFor="editRating">Rating:</label>
            <input id="editRating" type="number" name="rating" min="1" max="5" value={editSkill.rating} onChange={handleChange} required />
            
            <label htmlFor="editReference">Reference:</label>
            <input id="editReference" type="text" name="reference" value={editSkill.reference} onChange={handleChange} required />
          </div>
          <div className="modal-footer">
            <button type="submit" className="button save">Save Changes</button>
            <button type="button" className="button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );    
};

export default EditSkillModal;

