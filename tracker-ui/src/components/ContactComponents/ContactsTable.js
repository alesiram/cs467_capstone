import React, { useState } from 'react';

// Contact table to display contacts
const ContactsTable = ({ displayedContacts, onEditClick, onDeleteClick, onViewClick, setDisplayedContacts }) => {

    // Store sort criteria
    const [sortCriteria, setSortCriteria] = useState({ field: '', direction: 'asc' });

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

    // Sort displayed contacts
    const sortDisplayedContacts = (field) => {

        // Set ascending or descending
        const isAsc = sortCriteria.field === field && sortCriteria.direction === 'asc';
        setSortCriteria({ field, direction: isAsc ? 'desc' : 'asc' });

        // Sort contacts
        const sortedContacts = [...displayedContacts].sort((a, b) => {

            // Get field
            let valA = a[field], valB = b[field];
            if (valA == null) valA = '';
            if (valB == null) valB = '';

            // Check order
            const order = isAsc ? 1 : -1
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            // Return sorted order
            return (valA < valB) ? -1 * order : (valA > valB) ? 1 * order : 0;
        });

        // Set displayed contacts as the sorted contacts
        setDisplayedContacts(sortedContacts);
    };

    return (
        <div className="contact-table-container">
            <h2>Contacts</h2>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>
                            Name
                            <button onClick={() => sortDisplayedContacts('name')} className='contact-table-sort-button'>
                                {sortCriteria.field === 'name' ? (sortCriteria.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </button>
                        </th>
                        <th>
                            Company
                            <button onClick={() => sortDisplayedContacts('company')} className='contact-table-sort-button'>
                                {sortCriteria.field === 'company' ? (sortCriteria.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </button>
                        </th>
                        <th>
                            Email
                            <button onClick={() => sortDisplayedContacts('email')} className='contact-table-sort-button'>
                                {sortCriteria.field === 'email' ? (sortCriteria.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </button>
                        </th>
                        <th>
                            Follow Up
                            <button onClick={() => sortDisplayedContacts('followUpDate')} className='contact-table-sort-button'>
                                {sortCriteria.field === 'followUpDate' ? (sortCriteria.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </button>
                        </th>
                        <th>
                            Connection Rating
                            <button onClick={() => sortDisplayedContacts('strengthOfConnection')} className='contact-table-sort-button'>
                                {sortCriteria.field === 'strengthOfConnection' ? (sortCriteria.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </button>
                        </th>
                        <th>
                            Referral
                            <button onClick={() => sortDisplayedContacts('referralPotential')} className='contact-table-sort-button'>
                                {sortCriteria.field === 'referralPotential' ? (sortCriteria.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </button>
                        </th>
                        <th>Phone</th>
                        <th>
                            Type
                            <button onClick={() => sortDisplayedContacts('contactType')} className='contact-table-sort-button'>
                                {sortCriteria.field === 'contactType' ? (sortCriteria.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </button>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayedContacts.map((contact) => (
                        <tr key={contact._id}>
                            <td>{contact.name}</td>
                            <td>{contact.company}</td>
                            <td>{contact.email}</td>
                            <td>{contact.followUpDate ? formatDate(contact.followUpDate) : ""}</td>
                            <td>{strengthDescriptions[contact.strengthOfConnection]}</td>
                            <td>{contact.referralPotential ? "Yes" : "No"}</td>
                            <td>
                                {/* Iterate through each phone number and type */}
                                {contact.phoneNumbers.map((phone, index) => (
                                    <span key={`${contact._id}-${index}`} className="contact-phone-number">
                                        {phone.type}: {phone.number}<br />
                                    </span>
                                ))}
                            </td>
                            <td>{contact.contactType}</td>
                            <td className="contact-action-buttons">
                                <button onClick={() => onViewClick(contact)}>View</button>
                                <button onClick={() => onEditClick(contact)}>Edit</button>
                                <button onClick={() => onDeleteClick(contact)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactsTable;