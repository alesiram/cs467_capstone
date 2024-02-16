import React from 'react';

const DeleteJobModal = ({ job, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(job._id);
    onClose(); // Close the modal after delete action
  };

  return (
    <div className="job-modal delete-job-modal">
      <div className="job-modal-content">
        <h2>Delete Job</h2>
        <p>Are you sure you want to delete the job "{job.title}" at {job.company}?</p>
        <div className="job-modal-actions">
          <button className="job-modal-button delete" onClick={handleDelete}>Delete</button>
          <button className="job-modal-button cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobModal;
