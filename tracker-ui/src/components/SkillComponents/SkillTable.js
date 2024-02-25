// CREATED BY GPT 4.0

import React from 'react';

const SkillTable = ({ skills, onEdit, onDelete, onSort }) => {
  return (
    <table id="skillTable" className="skills-page__table">
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>Name</th>
          <th onClick={() => onSort('rating')}>Rating</th>
          <th onClick={() => onSort('reference.contactDetails.name')}>Reference</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill._id}>
            <td>{skill.name}</td>
            <td>{skill.rating}</td>
            {/* Display reference name or 'N/A' if not available */}
            <td>{skill.reference ? skill.contactDetails.name : 'N/A'}</td>
            <td>
              <button className="skills-page__action-button skills-page__action-button--edit" onClick={() => onEdit(skill)}>Edit</button>
              <button className="skills-page__action-button skills-page__action-button--delete" onClick={() => onDelete(skill._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );    
};

export default SkillTable;

