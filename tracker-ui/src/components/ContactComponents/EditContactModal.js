import React, { useState, useEffect } from 'react';

// Modal to edit a contact
const EditContactModal = ({ show, onClose, contact, updateContact }) => {

    // Store edited contact
    const [editedContact, setEditedContact] = useState(contact);

    // Set edited contact
    useEffect(() => {
        setEditedContact(contact);
    }, [contact]);

    // Handle event change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setEditedContact({ ...editedContact, [name]: checked });
        } else {
            setEditedContact({ ...editedContact, [name]: value });
        }
    };
    
    // Handle submission for edited contact
    const handleSubmit = (e) => {
        e.preventDefault();
        updateContact(editedContact);
        onClose();
    };
    
    // Return null if not displaying
    if (!show) return null;

    return (
        <div className="edit-contact-modal">
            <div className="edit-contact-modal-content">
                <span className="edit-contact-modal-close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit} className="edit-contact-modal-form">
                    <div className="edit-contact-modal-form-row">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" value={editedContact.name} onChange={handleChange} />
                    </div>

                    <div className="edit-contact-modal-form-row">
                        <label htmlFor="company">Company</label>
                        <input id="company" name="company" type="text" value={editedContact.company} onChange={handleChange} />
                    </div>

                    <div className="edit-contact-modal-form-row">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={editedContact.email} onChange={handleChange} />
                    </div>

                    {/* Assuming handling for multiple phone numbers is complex, here's a simplified approach for one */}
                    <div className="edit-contact-modal-form-row">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={editedContact.phoneNumbers?.[0]?.number || ''}
                            onChange={(e) => {
                                // Ensure there's at least one phoneNumber object to work with
                                const newPhoneNumbers = editedContact.phoneNumbers?.length > 0
                                    ? [{ ...editedContact.phoneNumbers[0], number: e.target.value }]
                                    : [{ number: e.target.value, type: 'Mobile' }];
                                setEditedContact({ ...editedContact, phoneNumbers: newPhoneNumbers });
                            }}
                        />
                    </div>

                    {/* PLACEHOLDER - ADD ALL FIELDS */}
                    <div className="under-construction-container">
                        <span className="under-construction-text">🚧 More Fields To Be Added Soon</span>
                    </div>
                    {/* PLACEHOLDER END */}

                    <div className="edit-contact-modal-form-actions">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContactModal;