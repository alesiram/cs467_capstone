// CREATED BY GPT 4.0

import React, { useState } from 'react';

const AddSkillModal = ({ onClose, onSave, contacts }) => {
  const [newSkill, setNewSkill] = useState({
    name: '',
    rating: '',
    reference: '' // Initially no contact is selected
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...newSkill,
      // Ensure the reference is sent as null if "N/A" is selected
      reference: newSkill.reference || null
    });
    onClose(); // Close the modal after save
  };

  return (
    <div className="modal-backdrop">
      <div className="modal" id="addSkillModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-header">
            <h2 id="modalTitle">Add New Skill</h2>
          </div>
          <div className="modal-body">
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" value={newSkill.name} onChange={handleChange} required />
  
            <label htmlFor="rating">Rating:</label>
            <input id="rating" type="number" name="rating" min="1" max="5" value={newSkill.rating} onChange={handleChange} required />
  
            <label htmlFor="reference">Reference:</label>
            <select 
              id="reference" 
              name="reference" 
              value={newSkill.reference} 
              onChange={handleChange}
            >
              <option value="">N/A</option> {/* Ensures option for no reference */}
              {contacts.map(contact => (
                <option key={contact._id} value={contact._id}>
                  {contact.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button type="submit" className="button add">Add</button>
            <button type="button" className="button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;




