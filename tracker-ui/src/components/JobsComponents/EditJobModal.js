import React, { useState, useEffect } from 'react';

const EditJobModal = ({ show, onClose, job, onSave }) => {
  const [editedJob, setEditedJob] = useState(job);

  useEffect(() => {
    setEditedJob(job); // This will reset the form with the new job when the job prop changes
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob({ ...editedJob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedJob);
    onClose(); // Close the modal after save
  };

  return (
    <div className="job-modal edit-job-modal">
      <div className="job-modal-content">
        <h2>Edit Job</h2>
        <span className="job-modal-close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className="two-column-form">
          <div className="form-column">
            <label>
              Company:
              <input type="text" name="company" value={editedJob.company} onChange={handleChange} />
            </label>
            <label>
              Title:
              <input type="text" name="title" value={editedJob.title} onChange={handleChange} />
            </label>
            <label>
              Type:
            
              <select type="text" name="type" value={editedJob.type} onChange={handleChange}>
              <option value="Full Time">Full Time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              </select>


            </label>
            <label>
              Location:
              <input type="text" name="location" value={editedJob.location} onChange={handleChange} />
            </label>
            <label>
              Job Posting Link:
              <input type="text" name="jobPostingLink" value={editedJob.jobPostingLink} onChange={handleChange} />
            </label>
          </div>
          <div className="form-column">
            <label>
              Pay:
              <input type="text" name="pay" value={editedJob.pay} onChange={handleChange} />
            </label>
            <label>
              Apply Date:
              <input type="text" name="applyDate" value={editedJob.applyDate} onChange={handleChange} />
            </label>
            <label>
              Status:
              <select name="status" value={editedJob.status} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>

            </label>
            <label>
              Interviewed:
              <select name="interviewed" value={editedJob.interviewed} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            </label>
            <label>
              Interview Date:
              <input type="text" name="interviewDate" value={editedJob.interviewDate} onChange={handleChange} />
            </label>
            <label>
              Decision:
              <select name="decision" value={editedJob.decision} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>

            </label>
            <label>
              Required Skills:
              <input type="text" name="requiredSkills" value={editedJob.requiredSkills} onChange={handleChange} />
            </label>
            <label>
              Notes:
              <input type="text" name="notes" value={editedJob.notes} onChange={handleChange} />
            </label>
          </div>
          <div className="job-modal-actions">
            <button type="submit" className="job-modal-button edit">Save Changes</button>
            <button type="button" className="job-modal-button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
