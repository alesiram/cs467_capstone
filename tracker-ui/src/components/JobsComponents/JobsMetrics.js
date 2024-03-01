import React, { useState, useEffect } from 'react'; 


const JobsMetricsModal = ({ show, onClose, totalJobs, totalApplications }) => {


  return (
    show && (
      <div className="jobs-metrics-modal">
        <div className="jobs-metrics-modal-background">
          <div className="modal-content">
            <h2>Job Metrics</h2>
            <div className="metric-tiles">
              <div className="metric-tile">
                <h3>Total Applications</h3>
                <p>{totalApplications}</p> {/* Use totalApplications here */}
      
              </div>

              <div className="metric-tile">
                <h3>Applications by Month</h3>
                <p>{}</p>
              </div>

              <div className="metric-tile">
                <h3>Open Jobs</h3>
                <p>{}</p>
              </div>
              {/* Add more metric tiles for other metrics */}

              <div className="metric-tile">
                <h3>Most applied to Company </h3>
                <p>{}</p>
              </div>


              <div className="metric-tile">
                <h3>Application Status - Month</h3>
         
              </div>

              <div className="metric-tile">
                <h3>Jobs Type </h3>
                <p>{}</p>
              </div>
            </div>
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
