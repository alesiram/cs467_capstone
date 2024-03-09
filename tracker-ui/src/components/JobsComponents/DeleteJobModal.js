import React from 'react';

const DeleteJobModal = ({ job, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(job._id);
    onClose(); // Close the modal after delete action
  };
  return (
    <div className="delete-modal-background">
      <div className="delete-modal-content">
        <h2>Delete Job</h2>
        <p>Are you sure you want to delete the job "{job.title}" at {job.company}?</p>
        <div className="delete-modal-actions">
          <button className="delete-modal-button delete" onClick={handleDelete}>Delete</button>
          <button className="delete-modal-button cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobModal;