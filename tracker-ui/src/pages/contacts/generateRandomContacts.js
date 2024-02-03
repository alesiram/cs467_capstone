// Generate 5 random contacts (if the user does not have any - PLACEHOLDER DURING TESTING)
const generateRandomContacts = () => {

    // Random names
    const names = ['Jane Doe', 'John Smith', 'Alex Johnson', 'Chris Lee', 'Sam Morgan'];
    const companies = ['Coder Corp', 'Tech Innovations', 'Web Solutions', 'Creative Designs', 'Global Tech'];

    // Allowable inputs for specific fields
    const contactTypes = ['Recruiter', 'Peer', 'Mentor', 'Alumni', 'Company Representative', 'Other'];
    const interactionTypes = ['Email', 'LinkedIn', 'In-person', 'Phone call', 'Online event', 'Other'];
    const sourceOfContacts = ['Job Fair', 'Referral', 'LinkedIn', 'Company Website', 'Networking Event', 'Other'];
    const statusesOfInteraction = ['Awaiting Response', 'In Discussion', 'Need to Follow Up', 'Closed', 'Other'];
    const preferredContactMethods = ['Email', 'Phone', 'LinkedIn', 'Other'];

    // Randomize
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];
    const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

    // Empty array
    const contacts = [];

    // Randomize 5 contacts 
    for (let i = 0; i < 5; i++) {
        contacts.push({
            _id: `dummy-${i + 1}-${Date.now()}-${Math.random()}`,
            name: randomElement(names),
            company: randomElement(companies),
            email: `${randomElement(names).toLowerCase().replace(/\s/g, '.')}.${i}@example.com`,
            notes: 'Generated note.',
            phoneNumbers: [
                {
                    number: `${Math.floor(100000000 + Math.random() * 900000000)}`,
                    type: 'Work'
                }
            ],
            contactType: randomElement(contactTypes),
            interactionType: randomElement(interactionTypes),
            sourceOfContact: randomElement(sourceOfContacts),
            statusOfInteraction: randomElement(statusesOfInteraction),
            strengthOfConnection: Math.floor(Math.random() * 5) + 1, // Random number between 1 and 5
            referralPotential: Math.random() < 0.5, // Randomly true or false
            preferredContactMethod: randomElement(preferredContactMethods),
            followUpDate: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)),
            lastContactedDate: randomDate(new Date(2022, 0, 1), new Date(2022, 11, 31))
        });
    }

    return contacts;
};

export default generateRandomContacts;