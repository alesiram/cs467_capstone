import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Button, Slider, Checkbox, FormControlLabel } from '@mui/material';

// Modal to edit a contact
const EditContactModal = ({ show, onClose, contact, updateContact, contacts, setContacts, companies }) => {

    // Store edited contact
    const [editedContact, setEditedContact] = useState(contact);

    // For toggling the success message
    const [showSuccess, setShowSuccess] = useState(false);

    // For checking if contact name already exists
    const [nameExists, setNameExists] = useState(false);

    // For storing original contact name
    const [originalName, setOriginalName] = useState(editedContact?.name);

    // Initialize edited contact with contact data
    useEffect(() => {
        setOriginalName(contact.name);
        setEditedContact(contact);
    }, [contact]);

    // Handle event change
    const handleChange = (e) => {
        // Get event target details
        const { name, value } = e.target;
        // Edit the contact value (if strength of connection store as number)
        setEditedContact(prevState => ({
            ...prevState,
            [name]: name === 'strengthOfConnection' ? Number(value) : value,
        }));
        // Check if name exists to warn user
        if (name === 'name') {
            const exists = checkForDuplicateName(value);
            setNameExists(exists);
        }
    };

    // Handle submission for edited contact
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clone editedContact to avoid directly mutating state
        let preparedEditedContact = { ...editedContact };
        // Check and set dateAdded to today's date if it's blank or null
        if (!preparedEditedContact.dateAdded) {
            preparedEditedContact.dateAdded = new Date().toISOString().split('T')[0]; // Sets to YYYY-MM-DD format
        }
        // Check and remove temporary _id from phoneNumbers
        if (preparedEditedContact.phoneNumbers && preparedEditedContact.phoneNumbers.length > 0) {
            preparedEditedContact.phoneNumbers = preparedEditedContact.phoneNumbers.map(phoneNumber => {
                if (phoneNumber._id && phoneNumber._id.startsWith('temp-')) { // Check for and remove temp _id
                    const { _id, ...rest } = phoneNumber;
                    return rest;
                }
                return phoneNumber;
            });
        }
        try {
            // Update contact with the prepared edited contact using the contact id and await updated contact
            const updatedContact = await updateContact(preparedEditedContact, preparedEditedContact._id);
            // Update the contacts state with the updated contact information
            setContacts(prevContacts => {
                return prevContacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact);
            });
            // Show success modal
            setShowSuccess(true);
            // Set timeout to close success modal, reset if name exists, reset original name, close the modal
            setTimeout(() => {
                // Show success message, reset the form and close the modal
                setShowSuccess(false);
                setNameExists(false);
                setOriginalName("");
                setEditedContact({});
                onClose();
            }, 1500)
        } catch (error) {
            // Handle any errors that occur during the update
            console.error("Failed to update contact:", error);
            alert("Failed to update contact.");
        }
    };

    // Handle phonenumber change in associated input field
    const handlePhoneNumberChange = (_id, fieldName, value) => {
        setEditedContact(prevState => {
            const updatedPhoneNumbers = prevState.phoneNumbers.map(phoneNumber => {
                if (phoneNumber._id === _id) {
                    return { ...phoneNumber, [fieldName]: value };
                }
                return phoneNumber;
            });
            return { ...prevState, phoneNumbers: updatedPhoneNumbers };
        });
    };

    // Handle adding the phone number
    const handleAddPhoneNumber = () => {
        setEditedContact(prevState => {
            // Temporarily generate a unique ID for frontend purposes
            const tempId = `temp-${Date.now()}`;
            const newPhoneNumber = { number: '', type: 'Mobile', _id: tempId }; // Temporarily assign _id
            return { ...prevState, phoneNumbers: [...prevState.phoneNumbers, newPhoneNumber] };
        });
    };


    // Handle removing specific phone number
    const handleRemovePhoneNumber = (_id) => {
        setEditedContact(prevState => {
            const updatedPhoneNumbers = prevState.phoneNumbers.filter(phoneNumber => phoneNumber._id !== _id);
            return { ...prevState, phoneNumbers: updatedPhoneNumbers };
        });
    };

    // Handle the check box change (referralPotential)
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditedContact(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    // Text for strength of connection ratings
    const ratingText = {
        1: "1 - Very Low",
        2: "2 - Low",
        3: "3 - Moderate",
        4: "4 - High",
        5: "5 - Very High",
    };

    // Check for duplidate name (excluding the current contact name being edited)
    const checkForDuplicateName = (value) => {
        const nameToLower = value.toLowerCase();
        const isDuplicate = contacts.some(contact =>
            contact.name.toLowerCase() === nameToLower && contact.name.toLowerCase() !== originalName.toLowerCase()
        );
        // return true/false if duplicate
        return isDuplicate;
    };

    // Allowable database fields (to dynamically generate options)
    const contactTypes = ['Recruiter', 'Peer', 'Mentor', 'Alumni', 'Company Representative', 'Other'];
    const interactionTypes = ['Email', 'LinkedIn', 'In-person', 'Phone call', 'Online event', 'Other'];
    const sourceOfContacts = ['Job Fair', 'Referral', 'LinkedIn', 'Company Website', 'Networking Event', 'Other'];
    const statusOfInteractions = ['Awaiting Response', 'In Discussion', 'Need to Follow Up', 'Closed', 'Other'];
    const preferredContactMethods = ['Email', 'Phone', 'LinkedIn', 'Other'];
    const phoneNumberTypes = ['Mobile', 'Work', 'Home', 'Other'];

    // Styles for contact form buttons
    const commonStylesContactFormButtons = {
        backgroundColor: 'var(--primary-color)',
        color: 'var(--button-text-color)',
        '&:hover': {
            backgroundColor: 'var(--secondary-color)',
            color: 'var(--button-text-color)',
        },
    };

    // Return null if not displaying
    if (!show) return null;

    return (
        // MODAL START
        <div className="edit-contact-modal">
            {/* MODAL CONTENT START */}
            <div className="edit-contact-modal-content">
                {/* Display success message when user adds new contact, else display the form */}
                {showSuccess ? (
                    <>
                        {/* Display the success message */}
                        <div className="contact-form-success-message">
                            <p>{editedContact.name} has been updated!</p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Close Modal Button */}
                        <span className="contact-form-modal-close" onClick={onClose}>&times;</span>
                        {/* Display the form to edit a contact*/}
                        <h2>{originalName}</h2>
                        {/* FORM START */}
                        <form onSubmit={handleSubmit} className='contact-add-edit-view-form'>

                            {/* Left hand side input fields */}
                            <div className="contact-add-edit-view-form-input-left-section">
                                {/* Contact Name (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Name*</label>
                                <input type="text" name="name" onChange={handleChange} defaultValue={editedContact?.name || ""} className="contact-add-edit-view-form-input" maxLength="50" required />
                                {nameExists && <span style={{ color: 'red', marginBottom: '10px', marginTop: '5px' }}>This contact name already exists!</span>}
                                {/* Contact Company (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Company*</label>
                                <Autocomplete
                                    freeSolo
                                    options={companies}
                                    value={editedContact.company || ''} // Set the current value
                                    onChange={(event, newValue) => {
                                        // Directly update the editedContact state for the company field when an option is selected or input is free-typed
                                        setEditedContact(prevState => ({ ...prevState, company: newValue }));
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        // Specifically handle the case where the input value changes (for free solo input)
                                        if (event && event.type === 'change') {
                                            setEditedContact(prevState => ({ ...prevState, company: newInputValue }));
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="company"
                                            required
                                            className="contact-add-edit-view-form-input"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    border: '1px solid var(--primary-color)',
                                                    backgroundColor: '#fff',
                                                    '&:hover fieldset': {
                                                        border: 'none',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        border: 'none',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {/* Contact Email (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Email*</label>
                                <input type="email" name="email" onChange={handleChange} defaultValue={editedContact?.email || ""} className="contact-add-edit-view-form-input" maxLength="50" required />
                                {/* Contact Phone Numbers (dynamic addition - up to 5 allowed numbers */}
                                <label>Phone Numbers</label>
                                {(editedContact.phoneNumbers || []).map((phoneNumber, index) => (
                                    <div key={phoneNumber._id} className="contact-add-edit-view-form-phoneNumber-div">
                                        <select name={`type-${phoneNumber._id}`} defaultValue={phoneNumber.type} onChange={(e) => handlePhoneNumberChange(phoneNumber._id, 'type', e.target.value)}>
                                            {phoneNumberTypes.map(type => (
                                                <option key={type} defaultValue={type}>{type}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            name={`number-${phoneNumber._id}`}
                                            defaultValue={phoneNumber.number}
                                            onChange={(e) => handlePhoneNumberChange(phoneNumber._id, 'number', e.target.value)}
                                            placeholder="Phone Number"
                                            maxLength={20}
                                        />
                                        {(editedContact.phoneNumbers.length > 1 || index === 0) && (
                                            <button type="button" onClick={() => handleRemovePhoneNumber(phoneNumber._id)}>Remove</button>
                                        )}
                                    </div>
                                ))}
                                {/* Allow up to 5 phone numbers maximum */}
                                {editedContact.phoneNumbers?.length < 5 && (
                                    <Button
                                        type="button" onClick={handleAddPhoneNumber}
                                        sx={{ mb: 1, mr: 1, width: '100%', ...commonStylesContactFormButtons }}
                                    >
                                        Add Phone Number
                                    </Button>
                                )}
                                {/* Contact Notes */}
                                <label>Notes</label>
                                <textarea name="notes" defaultValue={editedContact?.notes || ""} maxLength="200" className="contact-add-edit-view-form-notes-textarea" placeholder='Add your notes...' onChange={handleChange}></textarea>
                                <div style={{ color: 'var(--text-color)', marginTop: '5px' }}>{editedContact.notes ? 200 - editedContact.notes.length : 200} characters remaining</div>
                            </div>

                            {/* Right hand side input fields */}
                            <div className="contact-add-edit-view-form-input-right-section">
                                {/* Container for all date inputs */}
                                <div className="contact-add-edit-view-form-date-group">
                                    {/* Contact Date Added */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Date Added</label>
                                        <input type="date" name="dateAdded" defaultValue={editedContact?.dateAdded ? new Date(editedContact?.dateAdded).toISOString().split('T')[0] : ""} className="contact-add-edit-view-form-input" onChange={handleChange} />
                                    </div>
                                    {/* Contact Follow Up Date */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Follow Up Date</label>
                                        <input type="date" name="followUpDate" defaultValue={editedContact?.followUpDate ? new Date(editedContact?.followUpDate).toISOString().split('T')[0] : ""} className="contact-add-edit-view-form-input" onChange={handleChange} />
                                    </div>
                                    {/* Contact Last Contacted Date */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Last Contacted Date</label>
                                        <input type="date" name="lastContactedDate" defaultValue={editedContact?.lastContactedDate ? new Date(editedContact?.lastContactedDate).toISOString().split('T')[0] : ""} className="contact-add-edit-view-form-input" onChange={handleChange} />
                                    </div>
                                </div>
                                {/* Contact Type (required) */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label htmlFor="contactType" className="contact-add-edit-view-form-required-input-label">Contact Type*</label>
                                    <select name="contactType" value={editedContact?.contactType || ""} className="contact-add-edit-view-form-select" required onChange={handleChange} >
                                        {contactTypes.sort().map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Interaction Type */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Interaction Type</label>
                                    <select name="interactionType" value={editedContact?.interactionType || ""} className="contact-add-edit-view-form-select" onChange={handleChange} >
                                        <option value="" disabled></option>
                                        <option value="" disabled> - - - </option>
                                        {interactionTypes.sort().map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                        <option value="" disabled> - - - </option>
                                        <option value="">None</option>
                                    </select>
                                </div>
                                {/* Source of Contact */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Source of Contact</label>
                                    <select name="sourceOfContact" value={editedContact?.sourceOfContact || ""} className="contact-add-edit-view-form-select" onChange={handleChange} >
                                        <option value="" disabled></option>
                                        <option value="" disabled> - - - </option>
                                        {sourceOfContacts.sort().map((source) => (
                                            <option key={source} value={source}>{source}</option>
                                        ))}
                                        <option value="" disabled> - - - </option>
                                        <option value="">None</option>
                                    </select>
                                </div>
                                {/* Status of Interaction */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Status of Interaction</label>
                                    <select name="statusOfInteraction" value={editedContact?.statusOfInteraction || ""} className="contact-add-edit-view-form-select" onChange={handleChange} >
                                        <option value="" disabled></option>
                                        <option value="" disabled> - - - </option>
                                        {statusOfInteractions.sort().map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                        <option value="" disabled> - - - </option>
                                        <option value="">None</option>
                                    </select>
                                </div>
                                {/* Preferred Contact Method */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Preferred Contact Method</label>
                                    <select name="preferredContactMethod" value={editedContact?.preferredContactMethod || ""} className="contact-add-edit-view-form-select" onChange={handleChange} >
                                        <option value="" disabled></option>
                                        <option value="" disabled> - - - </option>
                                        {preferredContactMethods.sort().map((method) => (
                                            <option key={method} value={method}>{method}</option>
                                        ))}
                                        <option value="" disabled> - - - </option>
                                        <option value="">None</option>
                                    </select>
                                </div>
                                {/* Container for Strength of Connection and Referral Potential */}
                                <div className="contact-add-edit-view-form-div-attributes-group">
                                    {/* Strength of Connection */}
                                    <div className="contact-add-edit-view-form-div-attribute">
                                        <label htmlFor="strength-slider">Strength of Connection</label>
                                        <Slider
                                            name="strengthOfConnection"
                                            aria-label="Strength of Connection"
                                            value={editedContact?.strengthOfConnection || 1}
                                            onChange={handleChange}
                                            // Shows the value label on top of the slider thumb
                                            valueLabelDisplay="auto"
                                            // Shows scale marks
                                            marks
                                            min={1}
                                            max={5}
                                            step={1}
                                            sx={{
                                                width: '70%',
                                                color: 'var(--text-color)',
                                                '&:hover': { color: 'var(--text-color)' },
                                            }}
                                        />
                                        <div className="contact-add-edit-view-form-strength-of-connection-description">
                                            {ratingText[editedContact?.strengthOfConnection || 1]}
                                        </div>
                                    </div>
                                    {/* Referral Potential */}
                                    <div className="contact-add-edit-view-form-div-attribute">
                                        <label>Referral Potential</label>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="referralPotential"
                                                    checked={editedContact?.referralPotential || false}
                                                    onChange={handleCheckboxChange}
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        '&.Mui-checked': { color: 'var(--text-color)' },
                                                    }}
                                                />
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Footer for the buttons */}
                            <div className="contact-add-edit-view-form-footer">
                                <span className='contact-add-edit-view-form-required-input-label'>* Required Information *</span>
                                <div></div>
                                <Button
                                    type="submit"
                                    disabled={nameExists}
                                >
                                    Save Changes
                                </Button>
                            </div>

                            {/* FORM END */}
                        </form>
                    </>
                )}
                {/* MODAL CONTENT END */}
            </div>
            {/* MODAL END */}
        </div>
    );
};

export default EditContactModal;