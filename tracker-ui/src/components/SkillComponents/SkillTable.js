// CREATED BY GPT 4.0

import React from 'react';

const SkillTable = ({ skills, onEdit, onDelete, onSort }) => {
  return (
    <table id="skillTable">
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>Name</th>
          <th onClick={() => onSort('rating')}>Rating</th>
          <th onClick={() => onSort('reference.name')}>Reference</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill._id}>
            <td>{skill.name}</td>
            <td>{skill.rating}</td>
            {/* Display reference name or 'N/A' if not available */}
            <td>{skill.reference ? skill.reference.name : 'N/A'}</td>
            <td>
              <button className="button edit-button" onClick={() => onEdit(skill)}>Edit</button>
              <button className="button delete-button" onClick={() => onDelete(skill._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );  
};

export default SkillTable;

