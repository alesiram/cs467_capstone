// AddJobPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddJobPage = ({ onAddJob, onSaveAndClose, onCancel }) => {
  const history = useHistory();

  // State for the new job
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
    requiredSkills: [],
    notes: '',
  });

  const handleAddJob = () => {
    // Validate and add the new job
    if (newJob.company.trim() !== '') {
      onAddJob(newJob);
      onSaveAndClose(); // Invoke the callback to save and close the modal
      history.push('/jobs'); // Redirect back to the jobs page
    } else {
      alert('Please fill in the company name.'); // Add proper validation/error handling
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  return (
    <div className="add-job-container">
      <h2>Add New Job</h2>
      <form>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={newJob.company}
            onChange={handleChange}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleChange}
          />
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
          <input
            type="text"
            name="location"
            value={newJob.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Job Posting Link:
          <input
            type="text"
            name="jobPostingLink"
            value={newJob.jobPostingLink}
            onChange={handleChange}
          />
        </label>
        <label>
          Pay:
          <input
            type="text"
            name="pay"
            value={newJob.pay}
            onChange={handleChange}
          />
        </label>
        <label>
          Apply Date:
          <input
            type="text"
            name="applyDate"
            value={newJob.applyDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select name="status" value={newJob.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            {/* Add more status options as needed */}
          </select>
        </label>
        <label>
          Interviewed:
          <select
            name="interviewed"
            value={newJob.interviewed}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label>
          Interview Date:
          <input
            type="text"
            name="interviewDate"
            value={newJob.interviewDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Decision:
          <select
            name="decision"
            value={newJob.decision}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
        </label>
        <label>
          Required Skills:
          <input
            type="text"
            name="requiredSkills"
            value={newJob.requiredSkills}
            onChange={handleChange}
          />
        </label>
        <label>
          Notes:
          <textarea
            name="notes"
            value={newJob.notes}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleAddJob}>
          Save Job
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
