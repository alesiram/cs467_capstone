import React, { useState } from 'react';

// Modal to add a new contact
const AddContactModal = ({ show, onClose, onSave }) => {

    // Store new contact details
    const [newContact, setNewContact] = useState({
        name: '',
        company: '',
        email: '',
        // PLACEHOLDER - ADD ALL FIELDS FROM SCHEMA
    });

    // Handle event change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle submission for new contact
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newContact); // add new contact
        onClose(); // Close modal after saving
    };

    // Return null if not displaying
    if (!show) return null;

    return (
        <div className="add-contact-modal">
            <div className="add-contact-modal-content">
                <span className="add-contact-modal-close" onClick={onClose}>&times;</span>
                <h2>Add New Contact</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={newContact.name} onChange={handleChange} />

                    <label>Company:</label>
                    <input type="text" name="company" value={newContact.company} onChange={handleChange} />

                    <label>Email:</label>
                    <input type="email" name="email" value={newContact.email} onChange={handleChange} />

                    {/* PLACEHOLDER - ADD ALL FIELDS */}
                    <div className="under-construction-container">
                        <span className="under-construction-text">🚧 More Fields To Be Added Soon</span>
                    </div>
                    {/* PLACEHOLDER END */}

                    <button type="submit">Save Contact</button>
                </form>
            </div>
        </div>
    );
};

export default AddContactModal;
