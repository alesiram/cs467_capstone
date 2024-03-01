import React from 'react';

const JobsMetricsModal = ({ show, onClose, totalJobs, openJobs }) => {
  return (
    show && (
      <div className="jobs-metrics-modal">
        <div className="modal-background">
          <div className="modal-content">
            <h2>Job Metrics</h2>
            <table>
              <tbody>
                <tr>
                  <td className='left-align'>Total Jobs: </td>
                  <td>{totalJobs}</td>
                </tr>
                <tr>
                  <td className='left-align'>Open Jobs: </td>
                  <td>{openJobs}</td>
                </tr>
                <tr>
                  <td className='left-align'>Rejected: </td>
       
                </tr>
                <tr>
                  <td className='left-align'>Interviews Pending: </td>
        
                </tr>
                {/* Add more rows for other metrics */}
              </tbody>
            </table>
            <button className="job-modal-button-cancel" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default JobsMetricsModal;
