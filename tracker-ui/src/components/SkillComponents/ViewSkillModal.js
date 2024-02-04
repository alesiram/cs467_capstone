import React from 'react';
import Modal from 'react-modal';

const ViewSkillModal = ({ show, onClose, skill }) => {
  return (
    <Modal isOpen={show} onRequestClose={onClose}>
      <h2>Skill Details</h2>
      <div>
        <strong>Title:</strong> {skill.title}
      </div>
      <div>
        <strong>Rating:</strong> {skill.rating}
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ViewSkillModal;