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
  const [showJobsMetrics, setShowJobsMetrics] = useState(false);
  const [totalApplications, setTotalApplications] = useState(0); 
  const [totalOpenJobs, setTotalOpenJobs] = useState(0);
  const [fullTimeCount, setFullTimeCount] = useState(0);
  const [partTimeCount, setPartTimeCount] = useState(0);
  const [internshipCount, setInternshipCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [hiredCount, setHiredCount] = useState(0);
  const [skillCounts, setSkillPercentages] = useState({}); 
  const [interviewPendingCount, setinterviewPendingCount] = useState(0);
  const [interviewYescount, setinterviewYescount] = useState(0);
  const [interviewNocount, setinterviewNocount] = useState(0);

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
      if (!jobsResponse.ok) throw new Error('Failed to fetch data');

      const [jobsData, skillsData] = await Promise.all([jobsResponse.json(), skillsResponse.json()]);
      setJobs(jobsData);
      if (skillsResponse.ok) {
        setSkills(skillsData); // Update state with skills data
      }

    } catch (error) {
      setError('Failed to load data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseMetricsModal = () => {
    setShowJobsMetrics(false);
  };

  //search 
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

  // {/* Job Metric: Number of currenlty open jobs*/}
  useEffect(() => {
    const totalOpenJobs = jobs.filter(job => job.jobStatus === 'Open').length;
    setTotalOpenJobs(totalOpenJobs);
  }, [jobs]);

   //Job Metric: Total Jobs Applied to
  useEffect(() => {
    const totalAddedJobs = jobs.length;
    setTotalApplications(totalAddedJobs);
  }, [jobs]);


   // Job Metric: Calculate the count of each job type whenever the jobs data changes
   useEffect(() => {
    // Reset counts
    setFullTimeCount(0);
    setPartTimeCount(0);
    setInternshipCount(0);

    // Calculate counts
    jobs.forEach(job => {
      switch (job.type) {
        case 'Full Time':
          setFullTimeCount(prevCount => prevCount + 1);
          break;
        case 'Part-time':
          setPartTimeCount(prevCount => prevCount + 1);
          break;
        case 'Internship':
          setInternshipCount(prevCount => prevCount + 1);
          break;
        default:
          break;
      }
    });}, [jobs]);

// Job Metric: Calculate the count of each decision outcome whenever the jobs data changes
useEffect(() => {
  // Reset counts
  setPendingCount(0);
  setRejectedCount(0);
  setHiredCount(0);

  // Calculate counts
  jobs.forEach(job => {
    switch (job.decision) {
      case 'Pending':
        setPendingCount(prevCount => prevCount + 1);
        break;
      case 'Rejected':
        setRejectedCount(prevCount => prevCount + 1);
        break;
      case 'Hired':
        setHiredCount(prevCount => prevCount + 1);
        break;
    }
  });
}, [jobs]);

  // Job Metric: Calculate skill prescence in jobs 
useEffect(() => {
  // Initialize an empty Set to store unique skills
  const uniqueSkills = new Set();

  // Iterate over each job
  jobs.forEach(job => {
    // Add each skill to the Set
    job.requiredSkills.forEach(skill => {
      uniqueSkills.add(skill.name);
    });
  });

  // Get the total number of unique skills
  const totalSkills = jobs.length;

  //Job Metric: Calculate the percentage of each skill
  const percentages = {};
  uniqueSkills.forEach(skillName => {
    // Count how many times each skill appears across all jobs
    let skillCount = 0;
    jobs.forEach(job => {
      if (job.requiredSkills.some(skill => skill.name === skillName)) {
        skillCount++;
      }
    });
    // Calculate the percentage for each skill
    percentages[skillName] = Math.round((skillCount / totalSkills) * 100);
  });
  // Update the state with the calculated skill percentages
  setSkillPercentages(percentages);
}, [jobs]);

// Job Metric:Calculate the count of each interview outcome whenever the jobs data changes
useEffect(() => {
  // Reset counts
  setinterviewPendingCount(0);
  setinterviewYescount(0);
  setinterviewNocount(0);

  // Job Metric: Calculate counts
  jobs.forEach(job => {
    switch (job.interviewed) {
      case 'Pending':
        setinterviewPendingCount(prevCount => prevCount + 1);
        break;
      case 'No':
        setinterviewYescount(prevCount => prevCount + 1);
        break;
      case 'Yes':
        setinterviewNocount(prevCount => prevCount + 1);
        break;
      default:
        break;
    }
  });
}, [jobs]);

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

    // Alert the user that the job was deleted successfully
    alert("Job added successfully!");
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
        <button className='jobs-page-button-metrics' onClick={() => setShowJobsMetrics(true)}>View Job Metrics</button>

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
        
        <JobsMetrics show={showJobsMetrics} 
        onClose={handleCloseMetricsModal} 
        totalApplications={totalApplications}  
        totalOpenJobs={totalOpenJobs} 
        fullTimeCount={fullTimeCount} 
        partTimeCount={partTimeCount} internshipCount={internshipCount} 
        pendingCount={pendingCount}
        rejectedCount={rejectedCount}
        hiredCount={hiredCount}
        skillCounts={skillCounts}
        interviewPendingCount={interviewPendingCount}
        interviewYescount={interviewYescount}
        interviewNocount={interviewNocount}
  
        />

      </div>
    </div>
  );
};


export default JobsPage;
