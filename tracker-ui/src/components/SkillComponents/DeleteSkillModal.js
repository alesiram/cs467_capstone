// CREATED BY GPT 4.0

import React from 'react';

const DeleteSkillModal = ({ skill, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(skill._id);
    onClose(); // Close the modal after delete action
  };

  return (
    <div className="modal-backdrop">
      <div className="modal" id="deleteSkillModal" role="dialog" aria-modal="true" aria-labelledby="deleteModalTitle">
        <h2 id="deleteModalTitle">Delete Skill</h2>
        <p>Are you sure you want to delete the {skill.name} skill?</p>
        <div className="modal-footer">
          <button type="button" className="button delete" onClick={handleDelete}>Delete</button>
          <button type="button" className="button cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );  
};

export default DeleteSkillModal;



