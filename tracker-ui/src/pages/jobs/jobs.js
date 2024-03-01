import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import JobsTable from '../../components/JobsComponents/JobsTable';
import AddJobModal from '../../components/JobsComponents/AddJobModal';
import EditJobModal from '../../components/JobsComponents/EditJobModal';
import DeleteJobModal from '../../components/JobsComponents/DeleteJobModal';
import JobsMetrics from '../../components/JobsComponents/JobsMetrics';
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
  const [skills, setSkills] = useState([]); // Update to hold skills data
  const [selectedMonth, setSelectedMonth] = useState([null])
  const [showJobsMetrics, setShowJobsMetrics] = useState(false);

    

  const handleViewMetrics = () => {
    setShowJobsMetrics(true);
  };

  const handleCloseMetricsModal = () => {
    setShowJobsMetrics(false);
  };



  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const jobsPromise = fetch('/jobs', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const skillsPromise = fetch('/skills', { // Fetch skills instead of contacts
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      const [jobsResponse, skillsResponse] = await Promise.all([jobsPromise, skillsPromise]);
      if (!jobsResponse.ok || !skillsResponse.ok) throw new Error('Failed to fetch data');

      const [jobsData, skillsData] = await Promise.all([jobsResponse.json(), skillsResponse.json()]);
      setJobs(jobsData);
      setSkills(skillsData); // Update state with skills data
    } catch (error) {
      setError('Failed to load data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    fetchData()
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
      fetchData()
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
        <h1>Your Applied Jobs</h1>

        <button className='jobs-page-button-add-job ' onClick={() => setShowAddModal(true)}>Add New Job</button>
        {/* Add button to view job metrics */}
        <button className='jobs-page-button-add-job' onClick={() => setShowJobsMetrics(true)}>View Job Metrics</button>

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
          setJobs={setJobs} 
        />
        {showAddModal && <AddJobModal onClose={() => setShowAddModal(false)} onSave={handleAddJob} skills={skills} />}
        {showEditModal && selectedJob && <EditJobModal onClose={() => setShowEditModal(false)} onUpdate={handleEditJob} job={selectedJob} onSave={handleEditJob} skills={skills} />}
        {showDeleteModal && selectedJob && <DeleteJobModal onClose={() => setShowDeleteModal(false)} onDelete={(id) => handleDeleteJob(id)} job={selectedJob} setJobs={setJobs} />}
        <JobsMetrics show={showJobsMetrics} onClose={handleCloseMetricsModal} />

        
 



      </div>
    </div>
  );
};

export default JobsPage;
