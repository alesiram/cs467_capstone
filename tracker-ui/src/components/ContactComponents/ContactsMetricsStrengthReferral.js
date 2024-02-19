import React from 'react';

// To display each strength (of connection) breakdown
const StrengthMetricsBox = ({ level, totalContacts, referralPotential }) => {
    
    // Strength Description Ratings
    const strengthDescriptions = {
        '1': 'Very Low',
        '2': 'Low',
        '3': 'Moderate',
        '4': 'High',
        '5': 'Very High'
    };
    // Display level, total contacts at each level, and % of each that are referral potential
    return (
        <div className={`contacts-metrics-strength-box-div contacts-metrics-strength-${level}`}>
            <div>
                <p className={`contacts-strength-metrics-box-level`}>{level === "Total" ? "Total Contacts" : strengthDescriptions[level]}</p>
                <p># Contacts: <span>{totalContacts}</span></p>
                <p>Referral Potential: <span>{referralPotential}</span></p>
            </div>
        </div>
    );
};

// Contacts metrics for strength of connection and referral potential
const ContactsMetricsStrengthReferral = ({ contacts }) => {
    
    // Calculate the total number of contacts, and initialize the total referrals
    const totalContacts = contacts.length;
    let totalReferrals = 0;

    // Initialize an object to store counts by strength level
    const strengthLevels = {
        1: { total: 0, referralPotential: 0 },
        2: { total: 0, referralPotential: 0 },
        3: { total: 0, referralPotential: 0 },
        4: { total: 0, referralPotential: 0 },
        5: { total: 0, referralPotential: 0 },
    };

    // Aggregate data from contacts
    contacts.forEach(contact => {
        if (strengthLevels[contact.strengthOfConnection]) {
            strengthLevels[contact.strengthOfConnection].total += 1;
            if (contact.referralPotential) {
                strengthLevels[contact.strengthOfConnection].referralPotential += 1;
                // increment the total count of referral potentials
                totalReferrals += 1;
            }
        }
    });

    // Check if there are no contacts
    if (totalContacts === 0) {
        return <div>No contacts available.</div>;
    }

    return (
        <>
            {/* Display each strength of connection and the count/% for each */}
            <div className="contacts-metrics-strength-referral-container">
                {/* Display breakdown of total contacts */}
                <StrengthMetricsBox 
                    level={"Total"} 
                    totalContacts={totalContacts}
                    referralPotential={`${totalReferrals} (${totalReferrals > 0 ? ((totalReferrals / totalContacts) * 100).toFixed(2) : 0}%)`}
                />
                {/* Display breakdown of contacts by strength of connection */}
                {Object.entries(strengthLevels).map(([level, { total, referralPotential }]) => {
                    // Calc percentage of contacts with referral potential at each strength level
                    const percentage = total > 0 ? ((referralPotential / total) * 100).toFixed(2) : 0;
                    // Display each strength level breakdown
                    return (
                        <StrengthMetricsBox
                            key={level}
                            level={level}
                            totalContacts={total}
                            referralPotential={`${referralPotential} (${percentage}%)`}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ContactsMetricsStrengthReferral;
