// CREATED BY GPT 4.0

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

const SkillTable = ({ skills, onEdit, onDelete, onSort, onViewClick }) => {
  // Convert skills to rows for DataGrid
  const rows = skills.map(skill => ({
    ...skill,
    id: skill._id, // DataGrid requires each row to have a unique 'id' property
  }));

  // Define columns for DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', sortable: true, headerAlign: 'left', align: 'left', flex: 1},
    { field: 'rating', headerName: 'Rating', type: 'number', headerAlign: 'center', align: 'center', flex: 1},
    {
      field: 'contactDetails',
      headerName: 'Reference',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button onClick={() => onViewClick(params.row.contactDetails)}>
            {params.value ? params.row.contactDetails.name : 'N/A'}
          </Button>
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <button className="skills-page__action-button--edit" onClick={() => onEdit(params.row)}>Edit</button>
          <button className="skills-page__action-button--delete" onClick={() => onDelete(params.row.id)}>Delete</button>
        </Box>
      ),
      headerAlign: 'center',
      align: 'center',
    },
  ];

  // Reuse the DataGrid style from ContactsTable.js
  const getDataGridStyle = () => ({
    display: 'flex',
    width: '100%',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    border: 'none',
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'var(--text-color)',
        color: 'var(--button-text-color)',
    },
    '& .MuiDataGrid-cell': { borderBottom: '1px solid #eeeeee' },
    '& .MuiDataGrid-row': { '&:hover': { backgroundColor: 'lightgrey' } },
    "& .MuiDataGrid-sortIcon": { color: 'var(--primary-color)' },
    "& .MuiDataGrid-menuIconButton": { color: 'var(--primary-color)' },
    "& .MuiDataGrid-filterIcon": { color: 'var(--primary-color)' },
    mb: 3,
  });

  return (
    <Box sx={{ 
        height: 425,
        diplay: 'flex',
        width: '75%'
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={getDataGridStyle()}
      />
    </Box>
  );
};

export default SkillTable;


