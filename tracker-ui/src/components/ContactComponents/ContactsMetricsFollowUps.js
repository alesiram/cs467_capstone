import React, { useState, useMemo } from 'react';

// Pagination component to navigate through contacts in metric div
const ContactsMetricsPagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
    // If there are no items to show
    if (totalItems === 0) {
        return null;
    }
    // Total Pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // Go to the next page
    const goToNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) paginate(nextPage);
    };
    // Go to the previous page
    const goToPreviousPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) paginate(prevPage);
    };
    // Return the pagination navigation
    return (
        <nav className='contacts-metrics-pagination-nav'>
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>Back</button>
            {/* Display current page and total pages */}
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>Forward</button>
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

    const formatDate = (dateString) => {
        // Split the date string into its components
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));

        // Create a new date object using the local time zone
        // Note: Months are 0-indexed in JavaScript Date objects, hence the `month - 1`
        const date = new Date(year, month - 1, day);

        // Format the date to a locale-specific date string without converting time zones
        return date.toLocaleDateString();
    }

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
                                <p>{formatDate(contact.followUpDate)}</p>
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
                currentPage={currentPage}
                itemsPerPage={contactsPerPage} 
                totalItems={validContacts.length} 
                paginate={paginate} 
            />
        </div>
    );
};

export default ContactsMetricsFollowUps;
