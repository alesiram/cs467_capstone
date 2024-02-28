import React, { useState } from 'react';

const JobTableModal = ({ jobs, onEdit, onDelete }) => {
  console.log("jobs", jobs)
  // pagination state 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page


 // Search state
 const [searchQuery, setSearchQuery] = useState('');
  // Log jobs and searchQuery for debugging
  console.log('All jobs:', jobs);
  console.log('Search query:', searchQuery);

 // Filtered jobs based on search query
 const filteredJobs = jobs.filter((job) =>
 Object.values(job).some(
   (value) =>
     typeof value === 'string' &&
     value.toLowerCase().includes(searchQuery.toLowerCase())
 )
);


// Pagination logic
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem)
// Calculate total number of pages
const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);


  // Conditionally render the table only if there are jobs to display
  if (filteredJobs.length === 0) {
    return (
      <div>
        <div>No jobs found.</div>
        {/* Button to reset search */}
        <button onClick={() => setSearchQuery('')}>Show All Jobs</button>
      </div>
    );
  }

   // Calculate whether there are more pages available
   const hasMorePages = currentJobs.length === itemsPerPage && filteredJobs.length > indexOfLastItem;

  return (
    <div className="job-table-container">
        <input
        type="text"
        placeholder="Search jobs by company name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
        <table className="job-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Job Posting Link</th>
              <th>Pay</th>
              <th>Date Applied</th>
              <th>Job Status</th>
              <th>Interviewed</th>
              <th>Interview Date</th>
              <th>Decision</th>
              <th>Required Skills</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentJobs.map((job) => {

              // Formatting to display correct date in UI 
              // APPLY DATE 
              const dateParts = job.applyDate.split('T')[0].split('-');
              const year = parseInt(dateParts[0]);
              const month = parseInt(dateParts[1]) - 1; // Subtract 1 from the month since months are zero-based in JavaScript
              const day = parseInt(dateParts[2]);

              // Create a new Date object with the extracted components
              const newDate = new Date(year, month, day);
              // Format the date as desired (e.g., MM-DD-YYYY)
              const formattedDate = `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`;

              // INTERVIEW DATE
              let formattedInterviewDate = '';
              if (job.interviewDate && job.interviewDate.trim() !== '') {
                const interviewDateParts = job.interviewDate.split('T')[0].split('-');
                const interviewYear = parseInt(interviewDateParts[0]);
                const interviewMonth = parseInt(interviewDateParts[1]) - 1; // Subtract 1 from the month since months are zero-based in JavaScript
                const interviewDay = parseInt(interviewDateParts[2]);

                // Create a new Date object with the extracted components
                formattedInterviewDate = `${interviewMonth + 1}-${interviewDay}-${interviewYear}`;

                // If Interview Date is left blank
              } else {
                formattedInterviewDate = ''; // Set to empty string if interviewDate is empty
              }
              
              return (
                <tr key={job._id}>
                  <td>{job.company}</td>
                  <td>{job.title}</td>
                  <td>{job.type}</td>
                  <td>{job.location}</td>
                  <td>{job.jobPostingLink}</td>
                  <td>{job.pay}</td>
                  <td>{formattedDate}</td>
                  <td>{job.jobStatus}</td>
                  <td>{job.interviewed}</td>
                  <td>{job.interviewDate ? formattedInterviewDate : ''}</td>
                  <td>{job.decision}</td>
                  <td>
                    {job.requiredSkills.map(skill => (
                      <span key={skill._id}>{skill.name}<br /></span>
                    ))}
                  </td>
                  <td>{job.notes}</td>
                  <td className="job-action-buttons">
                    <button className="edit" onClick={() => onEdit(job)}>Edit</button>
                    <button className="delete" onClick={() => onDelete(job)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      {/* Pagination controls */}
              <div className="pagination-container">
              <span className="pagination-info">Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredJobs.length} entries</span>
              {/* First page button */}
              <button className="pagination-button" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                ««
              </button>
              {/* Previous page button */}
              <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                «
              </button>
              {/* Individual page buttons */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              {/* Next page button */}
              <button className="pagination-button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || filteredJobs.length === 0}>
                »
              </button>
              {/* Last page button */}
              <button className="pagination-button" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || filteredJobs.length === 0}>
                »»
              </button>
              {/* Display total entries information */}
            </div>
      </div>
  );
};

export default JobTableModal;
