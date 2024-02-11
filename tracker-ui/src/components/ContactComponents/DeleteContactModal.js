import React, { useState } from 'react';

// Modal to confirm deletion of a contact
const DeleteContactModal = ({ show, onClose, contact, deleteContact, contacts, setContacts }) => {

    // For toggling the success message
    const [showSuccess, setShowSuccess] = useState(false);

    // For storing the original name to display
    const [originalName, setOriginalName] = useState("");

    // Handle the deletion
    const handleSubmit = async (e) => {
        // Prevent default action
        e.preventDefault();
        // Try to delete the contact
        try {
            // Get the contact _id
            const contactId = contact._id;
            // Set the original name to display
            setOriginalName(contact.name)
            // Delete the contact and await the response from deleteContact()
            const deletedResponse = await deleteContact(contactId);
            // If successful deletion
            if (deletedResponse.message === 'Contact deleted') {
                // Remove deleted contact from contacts
                setContacts(contacts => contacts.filter(contact => contact._id !== contactId));
                // Show the success message
                setShowSuccess(true);
                // Set timeout to close the success message, reset the original name, close the modal
                setTimeout(() => {
                    setShowSuccess(false);
                    setOriginalName("");
                    onClose();
                }, 1500)
            }
            else {
                // Log if error
                console.log(deletedResponse.message)
            }
        } catch (error) {
            // Catch and log the error
            console.log("Failed to delete contact:", error);
            alert("Failed to delete contact");
        }
    }

    // Return null if not displaying
    if (!show) return null;

    return (
        // MODAL START
        <div className="delete-contact-modal">
            {/* MODAL CONTENT START */}
            <div className="delete-contact-modal-content">
                {/* Display success message when user deletes contact, else display buttons to delete contact */}
                {showSuccess ? (
                    <>
                        {/* Display the success message */}
                        <div className="contact-form-success-message">
                            <p>{originalName} has been deleted!</p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Display buttons to delete or cancel */}
                        <div className="delete-contact-modal-body">
                            <p>Are you sure you want to delete:</p>
                            <span className="delete-contact-modal-name-span">{contact.name}?</span>
                        </div>
                        <div className="delete-contact-modal-footer">
                            <button className="delete-contact-modal-cancel-button" onClick={onClose}>Cancel</button>
                            <button className="delete-contact-modal-delete-button" onClick={handleSubmit}>Delete</button>
                        </div>
                    </>
                )}
                {/* MODAL CONTENT END */}
            </div>
            {/* MODAL END */}
        </div>
    );
};

export default DeleteContactModal;