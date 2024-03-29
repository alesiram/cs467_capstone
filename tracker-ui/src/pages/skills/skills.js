// CREATED WITH GPT 4.0

// Packages and modals
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import NavBar from '../../components/NavBar';
import SkillTable from '../../components/SkillComponents/SkillTable';
import AddSkillModal from '../../components/SkillComponents/AddSkillModal';
import EditSkillModal from '../../components/SkillComponents/EditSkillModal';
import DeleteSkillModal from '../../components/SkillComponents/DeleteSkillModal';
import ViewContactModal from '../../components/ContactComponents/ViewContactModal';
import SkillMetricsModal from '../../components/SkillComponents/SkillMetricsModal';

// Icons
import SkillsIcon from '@mui/icons-material/Build';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Assuming './skills.css' and NavBar, SkillTable, AddSkillModal, EditSkillModal, DeleteSkillModal are correctly implemented
import './skills.css';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [contacts, setContacts] = useState([]); // Assuming contacts are needed for reference in Add/Edit Modals
  //const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState({ field: 'name', order: 'asc' });
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [showMetricsModal, setShowMetricsModal] = useState(false);


  // Combined fetch function for skills and contacts
  const fetchData = useCallback(async () => {
    setError(''); // Reset error message at the beginning of a fetch operation
    try {
      const token = localStorage.getItem('token');
      let queryParams = new URLSearchParams();
  
      if (searchTerm) queryParams.append('search', searchTerm);
  
      // Fetch skills
      const skillsResponse = await fetch(`/skills?${queryParams.toString()}`, {
          headers: { 'Authorization': `Bearer ${token}` },
      });
  
      // Fetch contacts
      const contactsResponse = await fetch('/contacts', {
          headers: { 'Authorization': `Bearer ${token}` },
      });
  
      if (!skillsResponse.ok) throw new Error('Failed to fetch skills');
      if (!contactsResponse.ok) throw new Error('Failed to fetch contacts');
  
      const skillsData = await skillsResponse.json();
      const contactsData = await contactsResponse.json();
  
      // Check if the search yielded no results and set an appropriate error message if so
      if (skillsData.length === 0 && searchTerm) {
        setError('No matching skills found.');
        setSkills([]); // Clear skills to show an empty table
      } else {
        setSkills(skillsData); // Otherwise, update the table with the fetched skills
        setError(''); // Clear any previous error message
      }
      
      setContacts(contactsData);
    } catch (error) {
      setError('No results match!');
      setSkills([]); // Ensure the skills list is cleared on error
    } finally {
    }
  }, [searchTerm]);
  
  // Inside your SkillsPage component
  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => {
      const field = sortCriteria.field;
      const order = sortCriteria.order;
  
      // Handling null or undefined for 'a'
      if (a[field] == null) return order === 'asc' ? 1 : -1;
      // Handling null or undefined for 'b'
      if (b[field] == null) return order === 'asc' ? -1 : 1;
  
      let compareResult = 0;
  
      // Numeric comparison
      if (field === 'rating' || typeof a[field] === 'number') {
        compareResult = a[field] - b[field];
      } else {
        // String comparison using localeCompare
        compareResult = a[field].localeCompare(b[field]);
      }
  
      // Reverse the comparison result if order is 'desc'
      return order === 'asc' ? compareResult : -compareResult;
    });
  }, [skills, sortCriteria]);

  // Add a function to update sort criteria based on column click
  const handleSortChange = (field) => {
    // Example of updating sort criteria state
    console.log('Sort was called on ', field)
    setSortCriteria(prevState => ({
      ...prevState,
      field: field,
      order: prevState.field === field && prevState.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Helper function to set current skill and show edit modal
  function setCurrentSkillAndShowEditModal(skill) {
    setCurrentSkill(skill);
    setShowEditModal(true);
  }
  
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Removed sortCriteria from dependencies
  
  // Add skill
  const addSkill = async (skill) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/skills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skill),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add the skill'); // Update error message based on response
        //setIsLoading(false);
        return; // Early return to avoid further processing
      }

      // Refetch skills to update the list and clear any existing error messages
      setError(''); // Clear any existing error message
      fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
    }
  };


  // Edit skill
  const editSkill = async (skill) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/skills/${skill._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skill),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the skill');
      }

      // Refetch skills to update the list
      fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
    }
  };

  // Delete skill
  const deleteSkill = async (skillId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the skill');
      }

      // Refetch skills to update the list
      fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
    }
  };

  // Function to set current skill and show delete modal
  function setCurrentSkillAndShowDeleteModal(skillId) {
    // Find the skill object from the skills array using the skillId
    const skillToDelete = skills.find(skill => skill._id === skillId);
    if (skillToDelete) {
      setCurrentSkill(skillToDelete); // Set this skill as the currentSkill state
      setShowDeleteModal(true); // Set showDeleteModal state to true to show the modal
    }
  }

  // Function to open the modal with the selected contact's details
  const handleViewClick = (contact) => {
    setCurrentContact(contact);
    setShowViewModal(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowViewModal(false);
    setCurrentContact({});
  };

  // Render part remains largely unchanged
  return (
    <div id="skillsPage">
      <NavBar />
      <div className="skills-page__container" >
      <div className="skills-page__header">
        <SkillsIcon style={{ marginRight: '8px', verticalAlign: 'middle' }} fontSize="large" />
        <h1>SKILLS</h1>
      </div>
        <div className="skills-page__add-and-metrics">
          <button className="skills-page__button--add-new"  onClick={() => setShowAddModal(true)}>
            <AddCircleIcon sx={{ color: 'var(--button-text-color' }} /> Add New Skill 
          </button>
          <button onClick={() => setShowMetricsModal(true)} className="skills-page__button--metrics">
            <DashboardIcon sx={{ color: 'var(--button-text-color' }} />View Skill Metrics
          </button>
        </div>
        
        <div className="skills-page__filters">
          <input
            type="text"
            placeholder="Search by name or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm('')} className="skills-page__action-button--clear">Clear</button>
        </div>
        
        {/* Error message display */}
        {error && <div className="skills-page__error-message">{error}</div>}
        
        <SkillTable
          skills={sortedSkills}
          onEdit={setCurrentSkillAndShowEditModal}
          onDelete={setCurrentSkillAndShowDeleteModal}
          onSort={handleSortChange}
          onViewClick={handleViewClick}
        />
        
        {showAddModal && <AddSkillModal onClose={() => setShowAddModal(false)} onSave={addSkill} contacts={contacts} />}
        {showMetricsModal && <SkillMetricsModal onClose={() => setShowMetricsModal(false)} />}
        {showEditModal && currentSkill && <EditSkillModal skill={currentSkill} onClose={() => setShowEditModal(false)} onSave={editSkill} contacts={contacts} />}
        {showDeleteModal && currentSkill && <DeleteSkillModal skill={currentSkill} onClose={() => setShowDeleteModal(false)} onDelete={deleteSkill} />}
        {currentContact && (<ViewContactModal show={showViewModal} onClose={handleCloseModal} contact={currentContact} />)}
      </div>
    </div>
  );
};

export default SkillsPage;

