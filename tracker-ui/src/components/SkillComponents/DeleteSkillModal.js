// CREATED BY GPT 4.0

import React from 'react';

const DeleteSkillModal = ({ skill, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(skill._id);
    onClose(); // Close the modal after delete action
  };

  return (
    <div className="skills-page__modal-backdrop">
      <div className="skills-page__modal skills-page__modal--delete" role="dialog" aria-modal="true" aria-labelledby="deleteModalTitle">
        <h2 id="deleteModalTitle">Delete Skill</h2>
        <p>Are you sure you want to delete the {skill.name}?</p>
        <div className="skills-page__modal-footer">
          <button type="button" className="skills-page__button--delete" onClick={handleDelete}>Delete</button>
          <button type="button" className="skills-page__button--cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  ); 
};

export default DeleteSkillModal;



