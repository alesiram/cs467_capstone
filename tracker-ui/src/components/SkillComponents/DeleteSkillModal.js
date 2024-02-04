// CREATED BY GPT 4.0

import React from 'react';

const DeleteSkillModal = ({ skill, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(skill._id);
    onClose(); // Close the modal after delete action
  };

  return (
    <div className="skills-modal delete-skills-modal">
      <div className="skills-modal-content">
        <h2>Delete Skill</h2>
        <p>Are you sure you want to delete the skill "{skill.name}"?</p>
        <div className="skills-modal-actions">
          <button className="skills-modal-button delete" onClick={handleDelete}>Delete</button>
          <button className="skills-modal-button cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSkillModal;



