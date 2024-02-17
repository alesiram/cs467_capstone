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
            }
        } catch (error) {
            // Catch the error
            setError(error.message)
        } finally {
            // Set is loading as false
            setIsLoading(false);
        }
    }

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
                return deletedResponse
            }
        } catch (error) {
            // Catch the error
            setError(error.message)
        }
    };

    // Placeholder to handle search search handler
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
                <div className="contacts-page-controls-container">
                    <button className="contacts-page-add-new-contact-button" onClick={() => setShowAddModal(true)}>Add New Contact</button>
                    <button className="contacts-page-toggle-dashboard-button" onClick={() => viewMode !== 'dashboard' ? setViewMode('dashboard') : setViewMode('table')}>{viewMode === 'dashboard' ? 'Contacts Table View' : 'Dashboard Metrics'}</button>
                </div>
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
                        {(viewMode === 'table' || viewMode === 'cards') && <ContactsSearchBar onSearch={handleSearch} />}
                        {renderView()}
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
            />
            {/* Edit Contact Modal for Current Contact */}
            {currentContact && <EditContactModal
                show={showEditModal}
                onClose={handleCloseModal}
                contact={currentContact}
                updateContact={handleUpdateContact}
                contacts={contacts}
                setContacts={setContacts}
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