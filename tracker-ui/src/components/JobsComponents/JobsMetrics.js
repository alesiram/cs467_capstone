import React, { useState, useEffect } from 'react'; 

const JobsMetricsModal = ({ show, onClose, totalApplications,  totalOpenJobs, fullTimeCount, partTimeCount, internshipCount, pendingCount, rejectedCount, hiredCount, skillCounts, interviewPendingCount, interviewYescount, interviewNocount }) => {
 
  return (
    show && (
      <div className="jobs-metrics-modal">
        <div className="jobs-metrics-modal-background">
          <div className="modal-content-">
          <div className="metrics-header">
            <h2>Job Metrics</h2>
          </div>
          
            <div className="metric-tiles">
              <div className="metric-tile">
                <h3>Total Applications</h3>
                <p>{totalApplications}</p> {/* Use totalApplications here */}
              </div>
              <div className="metric-tile">
                <h3>Open Jobs</h3>
                <p>{totalOpenJobs}</p>
              </div>
              <div className="metric-tile interview-outcomes">
                <h3>Interviewed Overview</h3>
                <p>
                  Pending: {interviewPendingCount}<br />
                  Yes: {interviewYescount}<br />
                  No: {interviewNocount}
                </p>
              </div>
              <div className="metric-tile">
              <h3>Skill Presence in Jobs</h3>
              {Object.entries(skillCounts).map(([skillName, count]) => (
                <div key={skillName} className="job-metric-skill-info"> {/* Add the className attribute */}
                  <span>{skillName}: </span>
                  <span>{count}%</span>
                </div>
              ))}
            </div>
            <div className="metric-tile">
              <h3>Total Jobs by Type </h3>
              <p>
                Full Time: {fullTimeCount} <br />
                Part-time: {partTimeCount} <br />
                Internship: {internshipCount}
              </p>
            </div>
              <div className="metric-tile">
                <h3>Decision Outcomes</h3>
                <p>
                Pending: {pendingCount}  <br />
                Rejected: {rejectedCount}  <br />
                Hired: {hiredCount}
                </p>
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
