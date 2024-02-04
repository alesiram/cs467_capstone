// CREATED BY GPT 4.0

import React from 'react';

const SkillTable = ({ skills, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Reference</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill._id}>
            <td>{skill.name}</td>
            <td>{skill.rating}</td>
            <td>{skill.reference}</td>
            <td>
              <button onClick={() => onEdit(skill)}>Edit</button>
              <button onClick={() => onDelete(skill._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkillTable;
