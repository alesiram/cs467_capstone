import React, { useState } from 'react';

// Contacts metrics for various types/categories
const ContactsMetricsTable = ({ contacts }) => {

    // State to keep track of the current active table
    const [activeTable, setActiveTable] = useState('interactionType');

    // Function to format header text
    const formatHeaderText = (text) => {
        return text
            // Split based on uppercase letters
            .split(/(?=[A-Z])/)
            // Capitalize the first letter of each word and join with spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Function to calculate counts and percentages for the active table
    const calculateData = () => {

        // Initiliaze variables
        const dataMap = {};
        let total = 0;

        // Calc for each contact
        contacts.forEach(contact => {
            const key = contact[activeTable];
            if (key) { // Ensure key is not null
                if (dataMap[key]) {
                    dataMap[key].count += 1;
                } else {
                    dataMap[key] = { count: 1 };
                }
                total += 1;
            }
        });

        // Calculate percentage
        Object.keys(dataMap).forEach(key => {
            dataMap[key].percentage = (dataMap[key].count / total * 100).toFixed(2);
        });

        // Return the map and total
        return { dataMap, total };
    };

    // Calculate the data for the current active table
    const { dataMap, total } = calculateData();

    return (
        <div className='contacts-metrics-table-component-container'>
            <div className='contacts-metrics-table-toggle-buttons-container'>
                <div className="contacts-metrics-table-toggle-buttons-div">
                    {/* Buttons to toggle the active table */}
                    <button onClick={() => setActiveTable('interactionType')}>Interaction Type</button>
                    <button onClick={() => setActiveTable('sourceOfContact')}>Source of Contact</button>
                    <button onClick={() => setActiveTable('statusOfInteraction')}>Status of Interaction</button>
                    <button onClick={() => setActiveTable('preferredContactMethod')}>Preferred Contact Method</button>
                </div>
            </div>
            {/* Show message if no data available for the active category */}
            {total === 0 ? (
                <div>No data available for {formatHeaderText(activeTable)}.</div>
            ) : (
                <>
                    <div className='contacts-metrics-table-container'>
                        <table className='contacts-metrics-table'>
                            <thead>
                                <tr>
                                    <th>{formatHeaderText(activeTable)}</th>
                                    <th># Contacts</th>
                                    <th>% of Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map the data to table rows */}
                                {Object.entries(dataMap).map(([key, value]) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value.count}</td>
                                        <td>{value.percentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ContactsMetricsTable;
