// CREATED WITH GPT 4.0

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SkillTable from '../../components/SkillComponents/SkillTable';
import AddSkillModal from '../../components/SkillComponents/AddSkillModal';
import EditSkillModal from '../../components/SkillComponents/EditSkillModal';
import DeleteSkillModal from '../../components/SkillComponents/DeleteSkillModal';

// Assuming './skills.css' and NavBar, SkillTable, AddSkillModal, EditSkillModal, DeleteSkillModal are correctly implemented
import './skills.css';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [contacts, setContacts] = useState([]); // Assuming contacts are needed for reference in Add/Edit Modals
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

  // Combined fetch function for skills and contacts
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simultaneous fetching of skills and contacts if needed
      const token = localStorage.getItem('token');
      const skillsPromise = fetch('/skills', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const contactsPromise = fetch('/contacts', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      // Await both promises
      const [skillsResponse, contactsResponse] = await Promise.all([skillsPromise, contactsPromise]);
      if (!skillsResponse.ok || !contactsResponse.ok) throw new Error('Failed to fetch data');

      const [skillsData, contactsData] = await Promise.all([skillsResponse.json(), contactsResponse.json()]);
      setSkills(skillsData);
      setContacts(contactsData);
    } catch (error) {
      setError('Failed to load data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add skill
const addSkill = async (skill) => {
  setIsLoading(true);
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
      throw new Error(errorData.message || 'Failed to add the skill');
    }

    // Refetch skills to update the list
    fetchData();
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

// Edit skill
const editSkill = async (skill) => {
  setIsLoading(true);
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
    setIsLoading(false);
  }
};

// Delete skill
const deleteSkill = async (skillId) => {
  setIsLoading(true);
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
    setIsLoading(false);
  }
};

  // Render part remains largely unchanged
  return (
    <div id="skillsPage">
      <NavBar />
      <div className="skills-container">
        <h1 id="skillsHeader">Skills</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <button id="addSkillButton" onClick={() => setShowAddModal(true)}>Add New Skill</button>
        <SkillTable skills={skills} onEdit={setCurrentSkillAndShowEditModal} onDelete={setCurrentSkillAndShowDeleteModal} />
        {showAddModal && <AddSkillModal onClose={() => setShowAddModal(false)} onSave={addSkill} contacts={contacts} />}
        {showEditModal && currentSkill && <EditSkillModal skill={currentSkill} onClose={() => setShowEditModal(false)} onSave={editSkill} contacts={contacts} />}
        {showDeleteModal && currentSkill && <DeleteSkillModal skill={currentSkill} onClose={() => setShowDeleteModal(false)} onDelete={deleteSkill} />}
      </div>
    </div>
  );

  // Helper function to set current skill and show edit modal
  function setCurrentSkillAndShowEditModal(skill) {
    setCurrentSkill(skill);
    setShowEditModal(true);
  }

  // Function to set current skill and show delete modal
  function setCurrentSkillAndShowDeleteModal(skillId) {
    // Find the skill object from the skills array using the skillId
    const skillToDelete = skills.find(skill => skill._id === skillId);
    if (skillToDelete) {
      setCurrentSkill(skillToDelete); // Set this skill as the currentSkill state
      setShowDeleteModal(true); // Set showDeleteModal state to true to show the modal
    }
}

};

export default SkillsPage;

