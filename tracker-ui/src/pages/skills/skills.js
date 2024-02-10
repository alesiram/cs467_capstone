// CREATED WITH GPT 4.0

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SkillTable from '../../components/SkillComponents/SkillTable';
import AddSkillModal from '../../components/SkillComponents/AddSkillModal';
import EditSkillModal from '../../components/SkillComponents/EditSkillModal';
import DeleteSkillModal from '../../components/SkillComponents/DeleteSkillModal';
import generateRandomSkills from './generateRandomSkills'; // Import your skill generation function

// Styling for the skills page
//import '../contacts/contacts.css'
import './skills.css'

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

  // Handler to get all skills for the user
  const handleGetSkills = () => {
    const fetchSkills = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/skills', {
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
        // PLACEHOLDER - GENERATE RANDOM DUMMY SKILLS IF USER HAS NONE
        if (data.length === 0) {
          data = generateRandomSkills();
        }
        setSkills(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  };

  useEffect(() => {
    handleGetSkills();
  }, []);

  // CREATED WITH GPT4
  const addSkill = async (skill) => {
    setIsLoading(true); // Assuming you have an isLoading state to show loading indicators
    try {
      const token = localStorage.getItem('token'); // Retrieve the authentication token
      const response = await fetch('/skills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skill),
      });
  
      if (!response.ok) {
        // If the server response is not OK, throw an error with the status text
        const errorData = await response.json(); // Assuming the server sends back a detailed error message
        throw new Error(errorData.message || 'Failed to add the skill');
      }
  
      const addedSkill = await response.json(); // Assuming the server returns the added skill with an ID
  
      // Update local state to include the new skill returned by the server
      // This ensures that the local state matches the server state, including any transformations or additional data (like an ID) added by the server
      setSkills((prevSkills) => [...prevSkills, addedSkill]);
      
      alert("Skill added successfully!"); // Provide user feedback
  
    } catch (error) {
      setError(error.message); // Assuming you have an error state to display error messages
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };  

  const editSkill = (updatedSkill) => {
    // Perform update operation
    setSkills(skills.map(skill => skill._id === updatedSkill._id ? updatedSkill : skill));
  };

  const deleteSkill = (skillId) => {
    // Perform delete operation
    setSkills(skills.filter(skill => skill._id !== skillId));
  };

  return (
    <div>
      <NavBar />
      <div className="skills-page">
        <h1>Skills</h1>
        <button onClick={() => setShowAddModal(true)}>Add New Skill</button>
        <SkillTable
            skills={skills}
            onEdit={(skill) => {
            setCurrentSkill(skill);
            setShowEditModal(true);
            }}
            onDelete={(skill) => {
            setCurrentSkill(skill);
            setShowDeleteModal(true);
            }}
        />
        {showAddModal && (
            <AddSkillModal
            onClose={() => setShowAddModal(false)}
            onSave={addSkill}
            />
        )}
        {showEditModal && currentSkill && (
            <EditSkillModal
            skill={currentSkill}
            onClose={() => setShowEditModal(false)}
            onSave={editSkill}
            />
        )}
        {showDeleteModal && currentSkill && (
            <DeleteSkillModal
            skill={currentSkill}
            onClose={() => setShowDeleteModal(false)}
            onDelete={deleteSkill}
            />
        )}
        </div>
    </div>
  );
};

export default SkillsPage;
