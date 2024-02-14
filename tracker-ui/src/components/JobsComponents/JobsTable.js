import React from 'react';

const JobTableModal = ({ jobs, onEdit, onDelete }) => {
  return (
    <div className="job-table-container">
      <table className="job-table">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.company}</td>
              <td>{job.title}</td>
              <td>{job.type}</td>
              <td>{job.location}</td>
              <td>{job.jobPostingLink}</td>
              <td>{job.pay}</td>
              <td>{job.applyDate}</td>
              <td>{job.status}</td>
              <td>{job.interviewed}</td>
              <td>{job.interviewDate}</td>
              <td>{job.decision}</td>
              <td>{job.requiredSkills}</td>
              <td>{job.notes}</td>
              <td className="job-action-buttons">
                <button onClick={() => onEdit(job)}>Edit</button>
                <button onClick={() => onDelete(job)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTableModal;
