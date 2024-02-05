// Jobs.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './jobs.css';
import AddJobPage from './AddJobPage';
import NavBar from '../../components/NavBar';

const JobStatusPage = () => {
  const history = useHistory();

  // Sample job applications data
  const [jobApplications, setJobApplications] = useState([
    {
      company: 'Walmart',
      title: 'Software Engineer Intern',
      type: 'Internship',
      location: 'San Diego, CA',
      jobPostingLink: 'https://sample-link.com',
      pay: '$100,000',
      applyDate: '2023-01-31',
      status: 'Open',
      interviewed: 'Yes',
      interviewDate: '2023-02-15',
      decision: 'Pending',
      requiredSkills: ['React', 'Node.js', 'JavaScript'],
      notes: 'This is a sample note for the job application.',
    },
    // ... (other existing job applications)
  ]);

  // State for handling the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddJob = async (newJob) => {
    // Update the jobApplications state with the new job
    setJobApplications((prevJobApplications) => [...prevJobApplications, newJob]);
    handleCloseModal(); // Close the modal after adding a new job
    try {
      const response = await fetch('/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      // If response is 200 ok, set the JWT token in local storage and go to home page
      if (response.ok) {
        const data = await response.json();
        console.log(data)
      } else {
        // Handle error message in modal
        const errorResponse = await response.json();
        console.log(errorResponse)
      }
    } catch (error) {
      
    }
  };

  const handleCancel = () => {
    handleCloseModal(); // Close the modal when cancel is clicked
  };

  return (
    <div>
    <NavBar />
    <div className="job-status-container">
      <h1>Job Application Status</h1>
      {/* Add Job button */}
      <div className="add-button-container">
        <button className="add-button" onClick={handleOpenModal}>
          Add Job
        </button>
      </div>

      {/* Table of job applications */}
      <table className="custom-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Type</th>
            <th>Location</th>
            <th>Job Posting Link</th>
            <th>Pay</th>
            <th>Apply Date</th>
            <th>Status</th>
            <th>Interviewed</th>
            <th>Interview Date</th>
            <th>Decision</th>
            <th>Required Skills</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((job, index) => (
            <tr key={index}>
              <td>{job.company}</td>
              <td>{job.title}</td>
              <td>
                <select value={job.type} className="dropdown">
                  <option value="Full Time">Full Time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </td>
              <td>{job.location}</td>
              <td>{job.jobPostingLink}</td>
              <td>{job.pay}</td>
              <td>{job.applyDate}</td>
              <td>{job.status}</td>
              <td>
                <select value={job.interviewed} className="dropdown">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>{job.interviewDate}</td>
              <td>
                <select value={job.decision} className="dropdown">
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </td>

            
              <td>{job.requiredSkills}</td>

              <td>{job.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pop-up Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Render the AddJobPage component inside the modal */}
            <AddJobPage
              onAddJob={handleAddJob}
              onSaveAndClose={handleCloseModal}
              onCancel={handleCancel} // Pass the cancel callback
            />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default JobStatusPage;
