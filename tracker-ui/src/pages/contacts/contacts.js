import React, { useState, useEffect } from 'react';

// Import NavBar
import NavBar from '../../components/NavBar';

// Import components for contacts page
import ContactsTable from '../../components/ContactComponents/ContactsTable';
import ContactsCard from '../../components/ContactComponents/ContactsCard';
import AddContactModal from '../../components/ContactComponents/AddContactModal';
import DeleteContactModal from '../../components/ContactComponents/DeleteContactModal';
import EditContactModal from '../../components/ContactComponents/EditContactModal';
import ViewContactModal from '../../components/ContactComponents/ViewContactModal';
import ContactsMetrics from '../../components/ContactComponents/ContactsMetrics';
import ContactsSearchBar from '../../components/ContactComponents/ContactsSearchBar';

// MUI Components and Icons
import { Button, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SortIcon from '@mui/icons-material/Sort';

// Styling for the contacts page and components
import './contacts.css';

// Contacts Page
const ContactsPage = () => {

    // Handle when screen is loading
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle the toggle views
    const [viewMode, setViewMode] = useState('table'); // 'table', 'cards', or 'dashboard'

    // Handle the search
    const [displayedContacts, setDisplayedContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStrengthFilter, setSelectedStrengthFilter] = useState([]);
    const [followUpComparisonFilter, setFollowUpComparisonFilter] = useState('');
    const [followUpDateFilter, setFollowUpDateFilter] = useState('');
    const [referralPotentialFilter, setReferralPotentialFilter] = useState('');
    const [sortOptionFilter, setSortOptionFilter] = useState('');
    const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [showSearchFieldsInfo, setShowSearchFieldsInfo] = useState(false);
    const [searchMessage, setSearchMessage] = useState('');

    // Handle contacts (i.e. users contacts)
    const [contacts, setContacts] = useState([]);

    // Handle companies from Jobs
    const [companies, setCompanies] = useState([]);

    // Handle modals for add/view/edit/delete - and current contact
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentContact, setCurrentContact] = useState({});

    // Handler to open view modal
    const handleViewClick = (contact) => {
        setCurrentContact(contact);
        setShowViewModal(true);
    };

    // Handler to open edit modal
    const handleEditClick = (contact) => {
        setCurrentContact(contact);
        setShowEditModal(true);
    };

    // Handler to open delete modal
    const handleDeleteClick = (contact) => {
        setCurrentContact(contact);
        setShowDeleteModal(true);
    };

    // Handler to close edit/delete modals
    const handleCloseModal = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowViewModal(false);
        setShowAddModal(false);
        setCurrentContact(null); // Clear current contact
    };

    // Update companies list for autocomplete text field on add/edit forms
    const updateCompaniesList = (newCompanies) => {
        setCompanies(prevCompanies => {
            // Check if newCompanies is an array and spread it accordingly
            const allCompanies = Array.isArray(newCompanies) ? [...prevCompanies, ...newCompanies] : [...prevCompanies, newCompanies];
            const updatedCompanies = [...new Set(allCompanies)];
            // Ensure the list remains sorted
            return updatedCompanies.sort();
        });
    };

    // Handle creating a new contact
    const handleCreateContact = async (newContact) => {
        // Try to create the new contact with auth'd token
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/contacts', {
                method: 'POST',
                body: JSON.stringify(newContact),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            // If response is not 201, throw an error
            if (response.status !== 201) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                // Await and returned the saved contact in db
                const savedContact = await response.json();
                // Update the companies list
                if (savedContact.company) {
                    updateCompaniesList(savedContact.company);
                }
                // Clear all filters
                clearAllSearchFilters();
                return savedContact;
            }
        } catch (error) {
            // Catch the error
            setError(error.message)
        }
    };

    // Handle updating/editing contact
    const handleUpdateContact = async (updatedContact, contactId) => {
        // Try to update the contact with auth'd token
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/contacts/${contactId}`, {
                method: 'PUT',
                body: JSON.stringify(updatedContact),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            // If response is not 200, throw an error
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                // Await and return the updated contact in db
                const updatedContact = await response.json();
                // Update the companies list
                if (updatedContact.company) {
                    updateCompaniesList(updatedContact.company);
                }
                // Clear all filters
                clearAllSearchFilters();
                return updatedContact;
            }
        } catch (error) {
            // Catch the error
            setError(error.message)
        }
    };

    // Handle deleting/removing contact
    const handleDeleteContact = async (contactId) => {
        // Try to delete the contact with auth'd token
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/contacts/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            // If response is not 200, throw an error
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                // Await and return the deleted response from db
                const deletedResponse = await response.json();
                // Clear all filters
                clearAllSearchFilters();
                return deletedResponse
            }
        } catch (error) {
            // Catch the error
            setError(error.message)
        }
    };

    // Clear search field and all filters
    const clearAllSearchFilters = () => {
        setSearchQuery('');
        setSelectedStrengthFilter([]);
        setFollowUpComparisonFilter('');
        setFollowUpDateFilter('');
        setReferralPotentialFilter('');
        setSortOptionFilter('');
        setShowAdvancedFilter(false);
        setFiltersApplied(false);
        setShowSearchFieldsInfo(false);
        setSearchMessage('');
    };

    // Contacts search bar props as object
    const contactsSearchBarProps = {
        contacts,
        displayedContacts,
        setDisplayedContacts,
        searchQuery,
        setSearchQuery,
        selectedStrengthFilter,
        setSelectedStrengthFilter,
        followUpComparisonFilter,
        setFollowUpComparisonFilter,
        followUpDateFilter,
        setFollowUpDateFilter,
        referralPotentialFilter,
        setReferralPotentialFilter,
        sortOptionFilter,
        setSortOptionFilter,
        showSearchFieldsInfo,
        setShowSearchFieldsInfo,
        showAdvancedFilter,
        setShowAdvancedFilter,
        filtersApplied,
        setFiltersApplied,
        setSearchMessage,
        clearAllSearchFilters
    }

    // Get all of the users contacts and companies from jobs/contacts for forms
    useEffect(() => {

        // Handler to get all contacts for the user
        const handleGetContacts = async () => {
            // Set is loading as true
            setIsLoading(true);
            // Try to get all contacts with auth'd token
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/contacts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                // If response is not 200, throw an error
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    // Await all contacts data
                    const contactsData = await response.json();
                    // Set contacts data
                    setContacts(contactsData);
                    // Extract companies from contacts (remove falsy values)
                    const contactCompanies = contactsData.map(contact => contact.company).filter(company => company);
                    updateCompaniesList(contactCompanies);
                }
            } catch (error) {
                // Catch the error
                setError(error.message)
            } finally {
                // Set is loading as false
                setIsLoading(false);
            }
        }

        // Get companies from Jobs to populate on forms
        const handleGetCompanies = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/jobs', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    const jobsData = await response.json();
                    const jobCompanies = jobsData.map(job => job.company);
                    updateCompaniesList(jobCompanies);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        // Call methods
        handleGetContacts();
        handleGetCompanies();
    }, []);

    // For search and filter functionality
    useEffect(() => {
        // Updates displayedContacts whenever the contacts list changes
        setDisplayedContacts(contacts);
    }, [contacts]);

    // Render the view as either table listing, cards, or the dasboard
    const renderView = () => {
        switch (viewMode) {
            // Display contacts as a table
            case 'table':
                return <ContactsTable
                    displayedContacts={displayedContacts}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    onViewClick={handleViewClick}
                    setDisplayedContacts={setDisplayedContacts}
                />;
            // Display contacts as cards
            case 'cards':
                return <div className="contacts-cards-container">
                    {/* Map each contact as it's own card */}
                    {displayedContacts.map(contact => (
                        <ContactsCard
                            key={contact._id}
                            contact={contact}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                            onViewClick={handleViewClick}
                        />
                    ))}
                </div>
            // Display the dashboard metrics
            case 'dashboard':
                return <ContactsMetrics contacts={contacts} />;
            default:
                return null;
        }
    };

    // Handle when the page is loading or if error loading
    if (isLoading) return <div className="contacts-page-loading-message"><span>Loading...</span></div>;
    if (error) return <div className="contacts-page-error-message">Error: {error}</div>;

    return (
        <>
            <NavBar />
            <div className={`contacts-page`}>
                <Box
                    className="contacts-page-controls-container"
                    sx={{
                        mt: 2,
                        mb: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        padding: '5px',
                    }}
                >
                    <Button
                        className="contacts-page-add-new-contact-button"
                        sx={{
                            m: 2,
                        }}
                        onClick={() => setShowAddModal(true)}
                    >
                        <AddCircleIcon sx={{ color: 'var(--button-text-color' }} /> Add New Contact
                    </Button>
                    {viewMode === 'dashboard' ? (
                        <Button
                            className="contacts-page-toggle-dashboard-button"
                            sx={{ m: 2 }}
                            onClick={() => setViewMode('table')}
                        >
                            <SortIcon /> Contacts Table View
                        </Button>
                    ) : (
                        <Button
                            className="contacts-page-toggle-dashboard-button"
                            sx={{ m: 2 }}
                            onClick={() => setViewMode('dashboard')}
                        >
                            <DashboardIcon /> Dashboard Metrics
                        </Button>
                    )}
                </Box>
                {viewMode !== 'dashboard' ? (
                    <>
                        <span className="contacts-page-view-mode-text">{viewMode === 'cards' ? 'Card View' : 'Table View'}</span>
                        <div className="contacts-page-view-toggle">
                            <input type="checkbox" id="contacts-page-viewModeToggle" className="contacts-page-view-mode-checkbox" hidden
                                checked={viewMode === 'cards'} onChange={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')} />
                            <label htmlFor="contacts-page-viewModeToggle" className="contacts-page-view-mode-label"></label>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {/* If no contacts then display message */}
                {contacts.length === 0 ? (
                    <>
                        <div className="contacts-page-banner">
                            <p className="contacts-page-banner-text">
                                Looks like you don't have any contacts! Get started by adding new ones.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Render the views for contacts */}
                        {(viewMode === 'table' || viewMode === 'cards') && <ContactsSearchBar {...contactsSearchBarProps} />}
                        {searchMessage && <div className='contact-search-filter-message-div'><h3>{searchMessage}</h3></div>}
                        {!searchMessage && renderView()}
                    </>
                )}
            </div>
            {/* Add Contact Modal */}
            <AddContactModal
                show={showAddModal}
                onClose={handleCloseModal}
                createContact={handleCreateContact}
                contacts={contacts}
                setContacts={setContacts}
                companies={companies}
            />
            {/* Edit Contact Modal for Current Contact */}
            {currentContact && <EditContactModal
                show={showEditModal}
                onClose={handleCloseModal}
                contact={currentContact}
                updateContact={handleUpdateContact}
                contacts={contacts}
                setContacts={setContacts}
                companies={companies}
            />}
            {/* Delete Contact Modal for Current Contact */}
            {currentContact && <DeleteContactModal
                show={showDeleteModal}
                onClose={handleCloseModal}
                deleteContact={handleDeleteContact}
                contact={currentContact}
                contacts={contacts}
                setContacts={setContacts}
            />}
            {/* View Contact Modal for Current Contact */}
            {currentContact && <ViewContactModal
                show={showViewModal}
                onClose={handleCloseModal}
                contact={currentContact}
            />}
        </>
    );
};

export default ContactsPage;