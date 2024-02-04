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


  const addSkill = (skill) => {
    // Perform add operation
    setSkills([...skills, skill]);
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
