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
    <div className="jobs-modal-background">
      <div className="jobs-modal-content">
        <div className="add-job-header">
            <h2>Add New Job</h2>
          </div>

        <form className="jobs-form-parent" onSubmit={handleSubmit}>
          <label className="jobs-form-label">
              Company:
              <input type="text" className="jobs-text" value={newJob.company} onChange={handleChange} required />
            </label>
            <label className="jobs-form-label">
              Title:
              <input type="text" className="jobs-text" value={newJob.title} onChange={handleChange} />
            </label>
            <label className="jobs-form-label">
              Type:
              <select className="jobs-select" value={newJob.type} onChange={handleChange}>
                <option value="Full Time">Full Time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </label>
            <label className="jobs-form-label">
              Location:
              <input type="text" className="jobs-text" value={newJob.location} onChange={handleChange}  />
            </label>
            <label className="jobs-form-label">
              Job Posting Link:
              <input type="text" className="jobs-text" value={newJob.jobPostingLink} onChange={handleChange} />
            </label>
            <label className="jobs-form-label">
              Pay:
              <input type="text" className="jobs-text" value={newJob.pay} onChange={handleChange} />
            </label>
          
          <label className="jobs-form-label">
              Apply Date:   
              <input 
                type="date" 
                className="jobs-drop-down" 
                value={newJob.applyDate} 
                onChange={handleChange}
              />
          </label>


            <label className="jobs-form-label">
              Status:
              <select className="jobs-select" value={newJob.jobStatus} onChange={handleChange}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </label>

            <label className="jobs-form-label">
              Interviewed:
              <select className="jobs-select" value={newJob.interviewed} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Pending">Pending</option>
              </select>
            </label>
  
            <label className="jobs-form-label">
              Interview Date:
              <input 
                type="date" 
                className="jobs-drop-down"
                value={newJob.interviewDate || ''} 
                onChange={handleChange} 
              />
            </label>

            <label className="jobs-form-label">
              Decision:
              <select className="jobs-select" value={newJob.decision} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
            </label>

            <label className="jobs-form-label">
              Required Skills:
              <Select
                isMulti
                options={skills.map(skill => ({ value: skill._id, label: skill.name }))}
                onChange={selectedSkills => setNewJob({ ...newJob, requiredSkills: selectedSkills })}
                value={newJob.requiredSkills}
              />
            </label>

            <label className="jobs-form-label">
              Notes:
              <input type="text" className="jobs-text" value={newJob.notes} onChange={handleChange} />
            </label>

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
