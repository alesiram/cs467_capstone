import React, { useState } from 'react';
import { TextField, Autocomplete, Button, Slider, Checkbox, FormControlLabel } from '@mui/material';

// Modal to add a new contact
const AddContactModal = ({ show, onClose, createContact, contacts, setContacts, companies }) => {

    // For toggling the success message
    const [showSuccess, setShowSuccess] = useState(false);

    // For checking if contact name already exists
    const [nameExists, setNameExists] = useState(false);

    // Manage the intial contact state
    const initialContactState = {
        name: '',
        company: '',
        email: '',
        phoneNumbers: [],
        notes: '',
        contactType: '',
        interactionType: '',
        sourceOfContact: '',
        statusOfInteraction: '',
        strengthOfConnection: 1,
        referralPotential: false,
        preferredContactMethod: '',
        dateAdded: new Date().toISOString().split('T')[0], // Current date in 'yyyy-MM-dd' format
        followUpDate: null,
        lastContactedDate: null,
    };

    // Store new contact details (start with initialized state)
    const [newContact, setNewContact] = useState({
        ...initialContactState
    });

    // Handle event change
    const handleChange = (e) => {
        // Get event target details
        const { name, value } = e.target;
        // Update new contact state property with value (as Number for strength of connection)
        setNewContact(prevState => ({
            ...prevState,
            [name]: name === 'strengthOfConnection' ? Number(value) : value,
        }));
        // Update naming associated with strength
        if (name === "strengthOfConnection") {
            updateStrengthDescription(value);
        }
        // Check for contact name uniqueness to warn user
        else if (name === "name") {
            const exists = contacts.some(contact => contact.name.toLowerCase() === value.toLowerCase());
            setNameExists(exists);
        }
    };

    // Handle submission for creating new contact
    const handleSubmit = async (e) => {
        // Prevent default form action
        e.preventDefault();
        // Prepare the new contact to save in the database
        const preparedContact = {
            name: newContact.name, // required
            company: newContact.company, // required
            email: newContact.email, // required
            phoneNumbers: newContact.phoneNumbers.filter(phoneNumber => phoneNumber.number.trim() !== ''), // remove any blanks
            notes: newContact.notes ? newContact.notes : null,
            contactType: newContact.contactType, //required
            interactionType: newContact.interactionType ? newContact.interactionType : null,
            sourceOfContact: newContact.sourceOfContact ? newContact.sourceOfContact : null,
            statusOfInteraction: newContact.statusOfInteraction ? newContact.statusOfInteraction : null,
            strengthOfConnection: newContact.strengthOfConnection ? newContact.strengthOfConnection : 1,
            referralPotential: newContact.referralPotential ? newContact.referralPotential : false,
            preferredContactMethod: newContact.preferredContactMethod ? newContact.preferredContactMethod : null,
            dateAdded: newContact.dateAdded ? new Date(newContact.dateAdded).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // date in 'yyyy-MM-dd' format
            followUpDate: newContact.followUpDate ? new Date(newContact.followUpDate).toISOString().split('T')[0] : null,
            lastContactedDate: newContact.lastContactedDate ? new Date(newContact.lastContactedDate).toISOString().split('T')[0] : null
        };
        try {
            // Wait for the createContact() operation to complete
            const savedContact = await createContact(preparedContact);
            // Set the savedContact (returned from successful POST route) in the contacts
            setContacts([...contacts, savedContact])
            // Show the success modal
            setShowSuccess(true);
            // Set timeout to close the modal
            setTimeout(() => {
                // Show success message, reset the new contact state and name check, and close the modal
                setShowSuccess(false);
                setNewContact(initialContactState);
                setNameExists(false);
                onClose();
            }, 1500)
        } catch (error) {
            // Handle error
            console.log("Failed to save contact:", error);
            alert("Failed to save contact");
        }
    };

    // Handle phonenumber change in associated input field
    const handlePhoneNumberChange = (index, fieldName, value) => {
        setNewContact(prevState => {
            const updatedPhoneNumbers = prevState.phoneNumbers.map((phoneNumber, i) => {
                if (i === index) {
                    return { ...phoneNumber, [fieldName]: value };
                }
                return phoneNumber;
            });
            return { ...prevState, phoneNumbers: updatedPhoneNumbers };
        });
    };

    // Handle adding the phone number
    const handleAddPhoneNumber = () => {
        setNewContact(prevState => {
            const newPhoneNumber = { number: '', type: 'Mobile' }; // Default to 'Mobile' type
            return { ...prevState, phoneNumbers: [...prevState.phoneNumbers, newPhoneNumber] };
        });
    };

    // Handle removing specific phone number
    const handleRemovePhoneNumber = (index) => {
        setNewContact(prevState => {
            const updatedPhoneNumbers = prevState.phoneNumbers.filter((_, i) => i !== index);
            return { ...prevState, phoneNumbers: updatedPhoneNumbers };
        });
    };

    // Handle the check box change (referralPotential)
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNewContact(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    // Handle clearning the form (set it back to initial state)
    const handleClearForm = () => {
        setNewContact(initialContactState);
        setNameExists(false);
    };

    // Update the strength descriptions in the form as user updates the slider
    const updateStrengthDescription = (value) => {
        // Possible strength descriptions (1 through 5)
        const strengthDescriptions = {
            '1': 'Very Low',
            '2': 'Low',
            '3': 'Moderate',
            '4': 'High',
            '5': 'Very High'
        };
        // Get the description based on the value (i.e. value = key)
        const description = strengthDescriptions[value];
        // Get and update the element to display the strength connection
        const strengthDescriptionElement = document.getElementById('contactAddFormStrengthDescription');
        if (strengthDescriptionElement) {
            strengthDescriptionElement.textContent = `${value} - ${description}`;
        }
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
        <div className="add-contact-modal">
            {/* MODAL CONTENT START */}
            <div className="add-contact-modal-content">
                {/* Display success message when user adds new contact, else display the form */}
                {showSuccess ? (
                    <>
                        {/* Display the success message */}
                        <div className="contact-form-success-message">
                            <p>{newContact.name} has been added to your contacts!</p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Close Modal Button */}
                        <span className="contact-form-modal-close" onClick={onClose}>&times;</span>
                        {/* Display the form to add a new contact*/}
                        <h2>Add New Contact</h2>
                        {/* FORM START */}
                        <form onSubmit={handleSubmit} className='contact-add-edit-view-form'>

                            {/* Left hand side input fields */}
                            <div className="contact-add-edit-view-form-input-left-section">
                                {/* Contact Name (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Name*</label>
                                <input type="text" name="name" value={newContact.name} onChange={handleChange} className="contact-add-edit-view-form-input" required maxLength="50" />
                                {nameExists && <span style={{ color: 'red', marginBottom: '10px', marginTop: '5px' }}>This contact name already exists!</span>}
                                {/* Contact Company (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Company*</label>
                                <Autocomplete
                                    freeSolo
                                    options={companies}
                                    value={newContact.company}
                                    onChange={(event, newValue) => {
                                        // Directly update the newContact state for the company field
                                        setNewContact(prevState => ({ ...prevState, company: newValue }));
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        // Update the company field only if it's a manual input (free solo)
                                        if (event && event.type === 'change') {
                                            setNewContact(prevState => ({ ...prevState, company: newInputValue }));
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
                                <input type="email" name="email" value={newContact.email} onChange={handleChange} className="contact-add-edit-view-form-input" required maxLength="50" />
                                {/* Contact Phone Numbers (dynamic addition - up to 5 allowed numbers */}
                                <label>Phone Numbers</label>
                                {newContact.phoneNumbers.map((phoneNumber, index) => (
                                    <div key={index} className="contact-add-edit-view-form-phoneNumber-div">
                                        <select name={`type-${index}`} value={phoneNumber.type} onChange={(e) => handlePhoneNumberChange(index, 'type', e.target.value)}>
                                            {phoneNumberTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <input type="text" name={`number-${index}`} value={phoneNumber.number} onChange={(e) => handlePhoneNumberChange(index, 'number', e.target.value)} placeholder="Phone Number" maxLength={20} />
                                        {(newContact.phoneNumbers.length > 1 || index === 0) && (
                                            <button type="button" onClick={() => handleRemovePhoneNumber(index)}>Remove</button>
                                        )}
                                    </div>
                                ))}
                                {newContact.phoneNumbers.length < 5 && (
                                    <Button
                                        type="button" onClick={handleAddPhoneNumber}
                                        sx={{ mb: 1, mr: 1, width: '100%', ...commonStylesContactFormButtons }}
                                    >
                                        Add Phone Number
                                    </Button>
                                )}
                                {/* Contact Notes */}
                                <label>Notes</label>
                                <textarea name="notes" value={newContact.notes} onChange={handleChange} maxLength="200" className="contact-add-edit-view-form-notes-textarea" placeholder='Add your notes...'></textarea>
                                <div style={{ color: 'var(--text-color)', marginTop: '5px' }}>{200 - newContact.notes.length} characters remaining</div>
                            </div>

                            {/* Right hand side input fields */}
                            <div className="contact-add-edit-view-form-input-right-section">
                                {/* Container for all date inputs */}
                                <div className="contact-add-edit-view-form-date-group">
                                    {/* Contact Date Added */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Date Added</label>
                                        <input type="date" name="dateAdded" value={newContact.dateAdded} onChange={handleChange} className="contact-add-edit-view-form-input" />
                                    </div>
                                    {/* Contact Follow Up Date */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Follow Up Date</label>
                                        <input type="date" name="followUpDate" value={newContact.followUpDate || ''} onChange={handleChange} className="contact-add-edit-view-form-input" />
                                    </div>
                                    {/* Contact Last Contacted Date */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Last Contacted Date</label>
                                        <input type="date" name="lastContactedDate" value={newContact.lastContactedDate || ''} onChange={handleChange} className="contact-add-edit-view-form-input" />
                                    </div>
                                </div>
                                {/* Contact Type (required) */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label htmlFor="contactType" className="contact-add-edit-view-form-required-input-label">Contact Type*</label>
                                    <select name="contactType" value={newContact.contactType} onChange={handleChange} className="contact-add-edit-view-form-select" required>
                                        <option value="" disabled>Select a Contact Type</option> {/* Ensures user makes an explicit choice */}
                                        <option value="" disabled> - - - </option>
                                        {contactTypes.sort().map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Interaction Type */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Interaction Type</label>
                                    <select name="interactionType" value={newContact.interactionType} onChange={handleChange} className="contact-add-edit-view-form-select">
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
                                    <select name="sourceOfContact" value={newContact.sourceOfContact} onChange={handleChange} className="contact-add-edit-view-form-select">
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
                                    <select name="statusOfInteraction" value={newContact.statusOfInteraction} onChange={handleChange} className="contact-add-edit-view-form-select">
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
                                    <select name="preferredContactMethod" value={newContact.preferredContactMethod} onChange={handleChange} className="contact-add-edit-view-form-select">
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
                                            value={newContact.strengthOfConnection}
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
                                        <div id="contactAddFormStrengthDescription" className="contact-add-edit-view-form-strength-of-connection-description">
                                            1 - Very Low (Move the Slider)
                                        </div>
                                    </div>
                                    {/* Referral Potential */}
                                    <div className="contact-add-edit-view-form-div-attribute">
                                        <label>Referral Potential</label>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="referralPotential"
                                                    checked={newContact.referralPotential}
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
                                <Button
                                    type="button"
                                    onClick={handleClearForm}
                                    className="add-contact-form-clear-inputs-button"
                                >
                                    Clear
                                </Button>
                                <span className='contact-add-edit-view-form-required-input-label'>* Required Information *</span>
                                <Button
                                    type="submit"
                                    disabled={nameExists}
                                >
                                    Save Contact
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

export default AddContactModal;
