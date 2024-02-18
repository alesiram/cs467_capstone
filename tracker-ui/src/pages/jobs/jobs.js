import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import NavBar from '../../components/NavBar';
import JobsTable from '../../components/JobsComponents/JobsTable';
import AddJobModal from '../../components/JobsComponents/AddJobModal';
import EditJobModal from '../../components/JobsComponents/EditJobModal';
import DeleteJobModal from '../../components/JobsComponents/DeleteJobModal';
import './jobs.css';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleGetJobs = () => {
    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/jobs', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            setJobs(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    fetchJobs();
};

  useEffect(() => {
    handleGetJobs();
  }, []);

  {/* search */}
  useEffect(() => {
    const filteredJobs = jobs.filter(job => {
      const searchTerm = searchQuery.toLowerCase().trim();
      if (searchTerm === '') {
        return true; // Show all jobs if search is empty
      } else {
        return job.name && job.name.toLowerCase().includes(searchTerm);
      }
    });
    setSearchResults(filteredJobs);
  }, [jobs, searchQuery]);


  const handleAddJob = async (newJob) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/jobs', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newJob)
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      let data = await response.json();
      setJobs([...jobs, data])
  } catch (error) {
      setError(error.message);
  } finally {
      setIsLoading(false);
  }
    // Close the add modal
    setShowAddModal(false);
  };



  const handleEditJob = async (updatedJob) => {
    // Handle editing a job
    // Find the index of the job to be updated
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/jobs/${updatedJob._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Update the job');
      }
      // Fetch the list of jobs from BE
      handleGetJobs()
      // Close the edit modal
      setShowEditModal(false);
  
      setIsLoading(true);
  
      // Alert the user that the job was deleted successfully
      alert("Job Updated successfully!");
    } catch (error) {
      setError(error.message);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the job');
      }
  
      // Update the local state to remove the deleted job
      setJobs(jobs.filter(job => job._id !== jobId));
  
      // Alert the user that the job was deleted successfully
      alert("Job deleted successfully!");
    } catch (error) {
      setError(error.message);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="jobs-page">
        {/* <h1>Job Applications</h1> */}
        <button onClick={() => setShowAddModal(true)}>Add Job</button>
        <JobsTable
          // jobs={jobs}
          jobs={searchResults}
          onEdit={(job) => {
            setSelectedJob(job);
            setShowEditModal(true);
          }}
          onDelete={(jobId) => {
            setSelectedJob(jobId);
            setShowDeleteModal(true);
          }}
        />
        {showAddModal && <AddJobModal onClose={() => setShowAddModal(false)} onSave={handleAddJob} />}
        {showEditModal && selectedJob && <EditJobModal onClose={() => setShowEditModal(false)} onUpdate={handleEditJob} job={selectedJob} onSave={handleEditJob}  />}
        {showDeleteModal && selectedJob && <DeleteJobModal onClose={() => setShowDeleteModal(false)} onDelete={(id) => handleDeleteJob(id)} job={selectedJob} />}
      </div>
    </div>
  );
};

export default JobsPage;
