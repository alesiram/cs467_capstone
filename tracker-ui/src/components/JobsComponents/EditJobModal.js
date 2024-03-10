import React, { useState } from 'react';
import Select from 'react-select';

const EditJobModal = ({ onClose, job, onSave, skills }) => {

  // func to transform the job object inot a format usable by react-select
  const transformJob = (job) => {
    // Mapping through required skills to create options for react-select
    let editedRequiredSkills = job.requiredSkills.map(skill => {
      let maybeSkill = null
      // matching skill names with avaialable skills to get their IDs
      for (const sk of skills) {
        if (sk.name === skill.name) {
          maybeSkill = { value: sk._id, label: sk.name }
        }
      }
      return maybeSkill
    })
    return {...job, requiredSkills: editedRequiredSkills}
  }

  const [editedJob, setEditedJob] = useState(transformJob(job));

   //This will reset the form with the new job when the job prop changes
   
  //  useEffect(() => {
  //   setEditedJob(transformJob(job)); 
  // }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update editedJob state except for the 'status' field
    if (name !== 'status') {
      setEditedJob({ ...editedJob, [name]: value });
    } else {
      // For 'status' field, update its value directly
      setEditedJob({ ...editedJob, jobStatus: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedJob);
    onClose(); // Close the modal after save
  };

  return (
    <div className="jobs-modal-background">
      <div className="jobs-modal-content">
        <div className="jobs-edit-header">
            <h2>Edit Job</h2>
        </div>
        <form className="jobs-form-parent" onSubmit={handleSubmit}>
          <label className="jobs-form-label">
              Company:
              <input type="text" className="jobs-text"  name="company" value={editedJob.company} onChange={handleChange} />
            </label>
            <label className="jobs-form-label">
              Title:
              <input type="text" className="jobs-text" name="title" value={editedJob.title} onChange={handleChange} />
            </label>
            <label className="jobs-form-label">
              Type:
              <select type="text" className="jobs-select" name="type" value={editedJob.type} onChange={handleChange}>
              <option value="Full Time">Full Time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              </select>
            </label>
            <label className="jobs-form-label">
              Location:
              <input type="text" className="jobs-text" name="location" value={editedJob.location} onChange={handleChange} />
            </label>
            <label className="jobs-form-label">
              Job Posting Link:
              <input type="text" className="jobs-text" name="jobPostingLink" value={editedJob.jobPostingLink} onChange={handleChange} />
            </label>
          <label className="jobs-form-label">
              Pay:
              <input type="text" className="jobs-text"  name="pay" value={editedJob.pay} onChange={handleChange} />
            </label>
            <label className="jobs-form-label">
              Apply Date:
              <input className="jobs-drop-down" name="applyDate" type="date" value={editedJob.applyDate ? editedJob.applyDate.split('T')[0] : ''} onChange={handleChange}/>
            </label>
            <label className="jobs-form-label">
              Status:
              <select className="jobs-select"  name="status" value={editedJob.jobStatus} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            </label>
            <label className="jobs-form-label">
              Interviewed:
              <select className="jobs-select" name="interviewed" value={editedJob.interviewed} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Pending">Pending</option>
              </select>
            </label>
            <label className="jobs-form-label">
              Interview Date:
              <input type="date" className="jobs-drop-down" name="interviewDate" value={editedJob.interviewDate ? editedJob.interviewDate.split('T')[0] : ''} onChange={handleChange}
              />
            </label>
            <label className="jobs-form-label">
              Decision:
              <select className="jobs-select" name="decision" value={editedJob.decision} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
            </label>
            {/* Dropdown for required skills */}
            <label className="jobs-form-label">
              Required Skills:
              <Select
                isMulti
                options={skills.map(skill => ({ value: skill._id, label: skill.name }))}
                onChange={selectedSkills => 
                  setEditedJob(
                    { ...editedJob, requiredSkills: selectedSkills}
                  )}
                value={editedJob.requiredSkills}
              />
            </label>
            <label className="jobs-form-label">
              Notes:
              <input type="text" className="jobs-text" name="notes" value={editedJob.notes} onChange={handleChange} />
          </label> 
          <div className="job-modal-actions">
            <button type="submit" className="job-modal-button-save">Save Changes</button>
            <button type="button" className="job-modal-button-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;