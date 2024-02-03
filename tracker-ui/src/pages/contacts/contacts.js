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

// Method to generate random contacts if none (FOR TESTING - DISCONNECT WHEN FRONTEND + BACKEND IMPLEMENTED)
import generateRandomContacts from './generateRandomContacts';

// Styling for the contacts page and components
import './contacts.css';

// Contacts Page
const ContactsPage = () => {

    // Handle when screen is loading
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState('contacts-page-light-mode'); // Default to contacts-page-light-mode

    // Handle the toggle views
    const [viewMode, setViewMode] = useState('table'); // 'table', 'cards', or 'dashboard'

    // Handle the search (not yet implemented)
    const [searchQuery, setSearchQuery] = useState('');
    
    // Handle contacts (i.e. users contacts)
    const [contacts, setContacts] = useState([]);

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

    // Handler to get all contacts for the user
    const handleGetContacts = () => {
        const fetchContacts = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/contacts', {
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
                // PLACEHOLDER - GENERATE RANDOM DUMMY CONTACTS IF USER HAS NONE
                if (data.length === 0) {
                    data = generateRandomContacts();
                }
                setContacts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContacts();
    }

    // Handle saving/creating a new contact (not yet implemented)
    const handleSaveContact = (contactData) => {
        // PLACEHOLDER - connect to backed to add contact (fetch)
        // PLACEHOLDER - On successful save, close modal & refresh page
        console.log(contactData);
        setShowAddModal(false);
    };

    // Handle updating/editing contact (not yet implemented)
    const handleUpdateContact = async (updatedContact) => {
        // PLACEHOLDER - connect to backend to update contact (fetch)
        // PLACEHOLDER - On successful update, update contacts state and close modal (refresh page)
        setShowEditModal(false);
    };

    // Handle deleting/removing contact (not yet implemented)
    const handleDeleteContact = async () => {
        // PLACEHOLDER - connect to backend to delete contact (fetch)
        // PLACEHOLDER - On successful deletion, remove contact from contacts state and close modal (refresh page)
        setShowDeleteModal(false);
    };

    // Placeholder to handle search search handler (not yet implemented)
    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log("Search query:", searchQuery);
        // PLACEHOLDER: 
        //    filteredContacts = contacts.filter(contact => contact.name.toLowercase().includes(query.toLowerCase()))
        //    setContacts(filteredContacts)
    };

    // Get all of the users contacts
    useEffect(() => {
        handleGetContacts();
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'contacts-page-light-mode' ? 'contacts-page-dark-mode' : 'contacts-page-light-mode');
    };

    // Render the view as either table listing, cards, or the dasboard
    const renderView = () => {
        switch (viewMode) {
            // Display contacts as a table
            case 'table':
                return <ContactsTable
                    contacts={contacts}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    onViewClick={handleViewClick}
                />;
            // Display contacts as cards
            case 'cards':
                return <div className="contacts-cards-container">
                    {/* Map each contact as it's own card */}
                    {contacts.map(contact => (
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
                return <ContactsMetrics />;
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
            <div className={`${theme} contacts-page`}>
                <div className="contacts-page-controls-container">
                    <button className="contacts-page-toggle-theme-button" onClick={toggleTheme}>{theme === 'contacts-page-light-mode' ? 'Light Mode is On' : 'Dark Mode Is On'}</button>
                    <button className="contacts-page-add-new-contact-button" onClick={() => setShowAddModal(true)}>Add New Contact</button>
                    <button className="contacts-page-toggle-dashboard-button" onClick={() => setViewMode('dashboard')}>Dashboard</button>
                </div>
                <span className="contacts-page-view-mode-text">{viewMode === 'cards' ? 'Card View' : 'Table View'}</span>
                <div className="contacts-page-view-toggle">
                    <input type="checkbox" id="contacts-page-viewModeToggle" className="contacts-page-view-mode-checkbox" hidden
                        checked={viewMode === 'cards'} onChange={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')} />
                    <label htmlFor="contacts-page-viewModeToggle" className="contacts-page-view-mode-label"></label>
                </div>
                {(viewMode === 'table' || viewMode === 'cards') && <ContactsSearchBar onSearch={handleSearch} />}
                {renderView()}
            </div>
            <AddContactModal show={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleSaveContact}/>
            {currentContact && <EditContactModal show={showEditModal} onClose={handleCloseModal} contact={currentContact} updateContact={handleUpdateContact} />}
            {currentContact && <DeleteContactModal show={showDeleteModal} onClose={handleCloseModal} confirmDeletion={handleDeleteContact} />}
            {currentContact && <ViewContactModal show={showViewModal} onClose={handleCloseModal} contact={currentContact}/>}
        </>
    );
};

export default ContactsPage;