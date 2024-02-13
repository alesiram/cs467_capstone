import React, { useState } from 'react';

const AddJobsModal = ({ onClose, onSave }) => {
  const [newJob, setNewJob] = useState({
    company: '',
    title: '',
    type: 'Full Time',
    location: '',
    jobPostingLink: '',
    pay: '',
    applyDate: '',
    status: 'Open',
    interviewed: 'No',
    interviewDate: '',
    decision: 'Pending',
    requiredSkills: '', 
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newJob);
    onClose(); // Close the modal after save
  };

  return (
    <div className="jobs-modal add-jobs-modal">
      <div className="jobs-modal-content">
        <h2>Add New Job</h2>
        <span className="jobs-modal-close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className="form-two-columns">
          <div className="column">
            <label>
              Company:
              <input type="text" name="company" value={newJob.company} onChange={handleChange} required />
            </label>
            <label>
              Title:
              <input type="text" name="title" value={newJob.title} onChange={handleChange} />
            </label>
            <label>
              Type:
              <select name="type" value={newJob.type} onChange={handleChange}>
                <option value="Full Time">Full Time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </label>
            <label>
              Location:
              <input type="text" name="location" value={newJob.location} onChange={handleChange}  />
            </label>
            <label>
              Job Posting Link:
              <input type="text" name="jobPostingLink" value={newJob.jobPostingLink} onChange={handleChange} />
            </label>
            <label>
              Pay:
              <input type="text" name="pay" value={newJob.pay} onChange={handleChange} />
            </label>
          </div>
          <div className="column">
            <label>
              Apply Date:
              <input type="text" name="applyDate" value={newJob.applyDate} onChange={handleChange}  />
            </label>
            <label>
              Status:
              <select name="status" value={newJob.status} onChange={handleChange}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </label>
            <label>
              Interviewed:
              <select name="interviewed" value={newJob.interviewed} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label>
              Interview Date:
              <input type="text" name="interviewDate" value={newJob.interviewDate} onChange={handleChange} />
            </label>
            <label>
              Decision:
              <select name="decision" value={newJob.decision} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
            </label>
            <label>
              Required Skills:
              <input type="text" name="requiredSkills" value={newJob.requiredSkills} onChange={handleChange} />
            </label>
            <label>
              Notes:
              <input type="text" name="notes" value={newJob.notes} onChange={handleChange} />
            </label>
          </div>
          <div className="jobs-modal-actions">
            <button type="submit" className="jobs-modal-button add">Add</button>
            <button type="button" className="jobs-modal-button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobsModal;
