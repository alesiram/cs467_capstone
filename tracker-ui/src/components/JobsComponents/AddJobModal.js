import React, { useState } from 'react';
import Select from 'react-select';

const AddJobsModal = ({ onClose, onSave, skills }) => {
 // Get current date in local timezone and format it
 const today = new Date();
 const formattedToday = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');

  const [newJob, setNewJob] = useState({
    company: '',
    title: '',
    type: 'Full Time',
    location: '',
    jobPostingLink: '',
    pay: '',
    applyDate: formattedToday, 
    jobStatus: 'Open',
    interviewed: 'No',
    interviewDate: null,
    decision: 'Pending',
    requiredSkills: [], 
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'interviewDate' && value === '' ? null : value;
    setNewJob({ ...newJob, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNewJob = {
      company: newJob.company,
      title: newJob.title,
      type: newJob.type,
      location: newJob.location,
      jobPostingLink: newJob.jobPostingLink,
      pay: newJob.pay,
      applyDate: newJob.applyDate ? new Date(newJob.applyDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      jobStatus: newJob.jobStatus,
      interviewed: newJob.interviewed,
      interviewDate: newJob.interviewDate ? new Date(newJob.interviewDate).toISOString().split('T')[0] : null,
      decision: newJob.decision,
      requiredSkills: newJob.requiredSkills,
      notes: newJob.notes
    };
    onSave(updatedNewJob);
    onClose(); // Close the modal after save
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Add New Job</h2>
        <span className="jobb-modal-close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className="two-column-form">
          <div className="form-column">
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
              <input 
                type="date" 
                name="applyDate" 
                value={newJob.applyDate} 
                onChange={handleChange} 
                style={{ marginLeft: '10px' }}
              />
            </label>
            </div>
            <div className="column">
            <label>
              Status:
              <select name="jobStatus" value={newJob.jobStatus} onChange={handleChange}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </label>
            </div>
            <div className="column">
            <label>
              Interviewed:
              <select name="interviewed" value={newJob.interviewed} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Pending">Pending</option>
              </select>
            </label>
            </div>
            <div className="column">
            <label>
              Interview Date:
              <input 
                type="date" 
                name="interviewDate" 
                value={newJob.interviewDate || ''} 
                onChange={handleChange} 
                style={{ marginLeft: '10px' }}
              />
            </label>
            </div>

            <div className="column">
            <label>
              Decision:
              <select name="decision" value={newJob.decision} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
            </label>
            </div>

            <div className="column">
            <label>
              Required Skills:
              <Select
                isMulti
                options={skills.map(skill => ({ value: skill._id, label: skill.name }))}
                onChange={selectedSkills => setNewJob({ ...newJob, requiredSkills: selectedSkills })}
                value={newJob.requiredSkills}
              />
            </label>
            </div>
            <div className="column">
            <label>
              Notes:
              <input type="text" name="notes" value={newJob.notes} onChange={handleChange} />
            </label>
          </div>
          <div className="jobs-modal-actions">
            <button type="submit" className="job-modal-button-add">Add</button>
            <button type="button" className="job-modal-button-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobsModal;
