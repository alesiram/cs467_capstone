import { DataGrid } from '@mui/x-data-grid';
import { Button, Tooltip, Box, Typography, IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Contact table to display contacts
const ContactsTable = ({ displayedContacts, onEditClick, onDeleteClick, onViewClick, setDisplayedContacts }) => {

    // Strength descriptions for each level
    const strengthDescriptions = {
        '1': 'Very Low',
        '2': 'Low',
        '3': 'Moderate',
        '4': 'High',
        '5': 'Very High'
    };

    // Format date string
    const formatDate = (dateString) => {
        // Split the date string into its components
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));

        // Create a new date object using the local time zone
        // Note: Months are 0-indexed in JavaScript Date objects, hence the `month - 1`
        const date = new Date(year, month - 1, day);

        // Format the date to a locale-specific date string without converting time zones
        return date.toLocaleDateString();
    }

    // Table rows for each displayed contact
    const rows = displayedContacts.map((contact) => ({
        // Spread the original contact to preserve all data
        ...contact,
        // Ensure each row has a unique identifier for DataGrid
        id: contact._id,
    }));

    // Table columns for each column that is displayed (note, not all columns displayed)
    const columns = [
        // Name
        { field: 'name', headerName: 'Name', width: 150 },
        // Company
        { field: 'company', headerName: 'Company', width: 150 },
        // Email
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            // Display the email w/ clipboard icon to allow user to copy email
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Copy email to clipboard">
                        <IconButton
                            onClick={() => navigator.clipboard.writeText(params.value)}
                            size="small"
                            style={{ marginRight: 8 }}
                        >
                            <FileCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {params.value}
                </div>
            ),
        },
        // Follow Up Date
        {
            field: 'followUpDate',
            headerName: 'Follow Up',
            width: 150,
            valueGetter: (params) => params.value ? formatDate(params.value) : "",
        },
        // Strength of Connection
        {
            field: 'strengthOfConnection',
            headerName: 'Connection Rating',
            width: 180,
            filterable: false,
            renderCell: (params) => strengthDescriptions[params.value],
        },
        // Referral Potential
        {
            field: 'referralPotential',
            headerName: 'Referral',
            width: 120,
            filterable: false,
            renderCell: (params) => params.value ? "Yes" : "No",
        },
        // Phone Numbers
        {
            field: 'phoneNumbers',
            headerName: 'Phone',
            width: 250,
            filterable: false,
            sortable: false,
            // Display Phone Numbers
            renderCell: (params) => {
                const phoneNumbers = params.value;
                // If there is no phone number
                if (!phoneNumbers || phoneNumbers.length === 0) {
                    return "";
                }
                // If there is only 1 phone number 
                else if (phoneNumbers.length === 1) {
                    return `${phoneNumbers[0].type}: ${phoneNumbers[0].number}`;
                }
                // More than 1 phone number
                else {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {`${phoneNumbers[0].type}: ${phoneNumbers[0].number}`}
                            <Tooltip title={phoneNumbers.map(phone => `${phone.type}: ${phone.number}`).join(', ')}>
                                <IconButton size="small" style={{ marginLeft: 8 }}>
                                    <MoreHorizIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    );
                }
            },
        },
        // Contact Type
        { field: 'contactType', headerName: 'Type', width: 150 },
        // View/Edit/Delete Button Actions
        {
            field: 'actions',
            headerName: '',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                // Exclude the DataGrid 'id'
                const { id, ...contact } = params.row;
                return (
                    <Box className="contact-action-buttons">
                        <Button onClick={() => onViewClick(contact)}>View</Button>
                        <Button onClick={() => onEditClick(contact)}>Edit</Button>
                        <Button onClick={() => onDeleteClick(contact)}>Delete</Button>
                    </Box>
                );
            },
        },
    ];

    // Styles for the DataGrid Table of Contacts
    const getDataGridStyle = () => ({
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
        <Box className="contact-table-container" sx={{ width: '100%', maxWidth: '1700px' }}>
            {/* Header */}
            <Typography variant='h2' sx={{ mt: 2, mb: 2 }}>Contacts</Typography>
            {/* Table of Contacts */}
            <DataGrid
                className="contact-table"
                rows={rows}
                columns={columns}
                // 10 items per page
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                // Table Grid Styling
                sx={getDataGridStyle()}
            />
        </Box>

    );
};

export default ContactsTable;