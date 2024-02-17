import React, { useState, useMemo } from 'react';

// Pagination component to navigate through contacts in metric div
const ContactsMetricsPagination = ({ itemsPerPage, totalItems, paginate }) => {
    // Empty list to store page numbers
    const pageNumbers = [];
    // Determine the page numbers based on total items and items per page
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    // Return the pagination navigation
    return (
        <nav className='contacts-metrics-pagination-nav'>
            <ul className='contacts-metrics-pagination-list'>
                {pageNumbers.map(number => (
                    <li key={number} className='contacts-metrics-pagination-page-item'>
                        <a href='#!' onClick={(e) => {
                            e.preventDefault(); // Prevent the default anchor link behavior
                            paginate(number);
                        }}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// Main component to display contacts and follow-up dates
const ContactsMetricsFollowUps = ({ contacts }) => {

    // States to manage the current page and the number of contacts per page
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(3);

    // Filter contacts with valid followUpDate and sort by date
    const validContacts = useMemo(() => contacts.filter(contact => contact.followUpDate).sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate)), [contacts]);

    // Get current contacts for pagination
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = validContacts.slice(indexOfFirstContact, indexOfLastContact);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="contacts-metrics-follow-up-reminders-div">
            {/* Display All Follow Up Dates if Valid Contacts */}
            {validContacts.length > 0 ? (
                <>
                    <p className='contacts-metrics-current-date'>Today's Date: {new Date().toLocaleDateString()}</p>
                    <ul className="contacts-metrics-follow-up-list">
                        {/* For each contact display the name, email, follow up date */}
                        {currentContacts.map(contact => (
                            <li key={contact._id} className="contacts-metrics-follow-up-item">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                                <p>{new Date(contact.followUpDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                    <br></br>
                </>
            ) : (
                // No Valid contacts so display message to user
                <p className="contacts-metrics-no-followups-msg">No upcoming follow-ups. You're all caught up!</p>
            )}
            <ContactsMetricsPagination 
                itemsPerPage={contactsPerPage} 
                totalItems={validContacts.length} 
                paginate={paginate} 
            />
        </div>
    );
};

export default ContactsMetricsFollowUps;
