import React, { useState } from 'react';

// Modal to view a contact
const ViewContactModal = ({ show, onClose, contact }) => {

    // For toggling between detail and summary views
    const [showDetail, setShowDetail] = useState(false);

    // Handle toggling the view
    const handleView = (e) => {
        e.preventDefault();
        // Toggle between detail and summary
        showDetail ? setShowDetail(false) : setShowDetail(true);
    }

    // Text for strength of connection ratings
    const ratingText = {
        1: "1 - Very Low",
        2: "2 - Low",
        3: "3 - Moderate",
        4: "4 - High",
        5: "5 - Very High",
    };

    // Return null if not displaying
    if (!show) return null;

    return (
        // MODAL START
        <div className="view-contact-modal">
            {/* MODAL CONTENT START */}
            <div className="view-contact-modal-content">
                {/* Close Modal Button */}
                <span className="contact-form-modal-close" onClick={onClose}>&times;</span>
                <h2>{contact.name}</h2>
                {/* Display summary view or detailed view */}
                {!showDetail ? (
                    <>
                        {/* Display Summary */}
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Company:</strong> {contact.company}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <div className="contact-add-edit-view-form-footer">
                            <div></div>
                            <button className="view-contact-show-summary-detail-button" onClick={handleView}>Show Details</button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* FORM START (Display Detail) */}
                        <form className='contact-add-edit-view-form'>

                            {/* Left hand side input fields */}
                            <div className="contact-add-edit-view-form-input-left-section">
                                {/* Contact Name (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Name</label>
                                <input type="text" name="name" value={contact?.name || ""} className="contact-add-edit-view-form-input" required maxLength="50" readOnly />
                                {/* Contact Company (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Company</label>
                                <input type="text" name="company" value={contact?.company || ""} className="contact-add-edit-view-form-input" required maxLength="50" readOnly />
                                {/* Contact Email (required) */}
                                <label className='contact-add-edit-view-form-required-input-label'>Email</label>
                                <input type="email" name="email" value={contact?.email || ""} className="contact-add-edit-view-form-input" required maxLength="50" readOnly />
                                {/* Contact Phone Numbers (dynamic addition - up to 5 allowed numbers */}
                                <label>{contact.phoneNumbers.length > 0 ? "Phone Numbers" : ""}</label>
                                {contact.phoneNumbers.map((phoneNumber, index) => (
                                    <div key={index} className="contact-add-edit-view-form-phoneNumber-div">
                                        <select name={`type-${index}`} value={phoneNumber?.type || ""} disabled>
                                            <option>{phoneNumber?.type || ""}</option>
                                        </select>
                                        <input type="text" name={`number-${index}`} value={phoneNumber?.number || ""} placeholder="Phone Number" maxLength={20} readOnly />
                                    </div>
                                ))}
                                {/* Contact Notes */}
                                <label>Notes</label>
                                <textarea name="notes" value={contact?.notes || ""} maxLength="200" className="contact-add-edit-view-form-notes-textarea" placeholder='Add your notes...' readOnly></textarea>
                            </div>

                            {/* Right hand side input fields */}
                            <div className="contact-add-edit-view-form-input-right-section">
                                {/* Container for all date inputs */}
                                <div className="contact-add-edit-view-form-date-group">
                                    {/* Contact Date Added */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Date Added</label>
                                        <input type="date" name="dateAdded" value={contact.dateAdded ? new Date(contact.dateAdded).toISOString().split('T')[0] : ""} className="contact-add-edit-view-form-input" readOnly />
                                    </div>
                                    {/* Contact Follow Up Date */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Follow Up Date</label>
                                        <input type="date" name="followUpDate" value={contact.followUpDate ? new Date(contact.followUpDate).toISOString().split('T')[0] : ""} className="contact-add-edit-view-form-input" readOnly />
                                    </div>
                                    {/* Contact Last Contacted Date */}
                                    <div className="contact-add-edit-view-form-date-input-div">
                                        <label>Last Contacted Date</label>
                                        <input type="date" name="lastContactedDate" value={contact.lastContactedDate ? new Date(contact.lastContactedDate).toISOString().split('T')[0] : ""} className="contact-add-edit-view-form-input" readOnly />
                                    </div>
                                </div>
                                {/* Contact Type (required) */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label htmlFor="contactType" className="contact-add-edit-view-form-required-input-label">Contact Type</label>
                                    <select name="contactType" value={contact?.contactType || ""} className="contact-add-edit-view-form-select" required disabled>
                                        <option>{contact?.contactType || ""}</option>
                                    </select>
                                </div>
                                {/* Interaction Type */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Interaction Type</label>
                                    <select name="interactionType" value={contact?.interactionType || ""} className="contact-add-edit-view-form-select" disabled>
                                        <option>{contact?.interactionType || ""}</option>
                                    </select>
                                </div>
                                {/* Source of Contact */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Source of Contact</label>
                                    <select name="sourceOfContact" value={contact?.sourceOfContact || ""} className="contact-add-edit-view-form-select" disabled>
                                        <option>{contact?.sourceOfContact || ""}</option>
                                    </select>
                                </div>
                                {/* Status of Interaction */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Status of Interaction</label>
                                    <select name="statusOfInteraction" value={contact?.statusOfInteraction || ""} className="contact-add-edit-view-form-select" disabled>
                                        <option>{contact?.statusOfInteraction || ""}</option>
                                    </select>
                                </div>
                                {/* Preferred Contact Method */}
                                <div className="contact-add-edit-view-form-div-select">
                                    <label>Preferred Contact Method</label>
                                    <select name="preferredContactMethod" value={contact?.preferredContactMethod || ""} className="contact-add-edit-view-form-select" disabled>
                                        <option>{contact?.preferredContactMethod || ""}</option>
                                    </select>
                                </div>
                                {/* Container for Strength of Connection and Referral Potential */}
                                <div className="contact-add-edit-view-form-div-attributes-group">
                                    {/* Strength of Connection */}
                                    <div className="contact-add-edit-view-form-div-attribute">
                                        <label>Strength of Connection</label>
                                        <input type="range" name="strengthOfConnection" min="1" max="5" value={contact.strengthOfConnection} className="contact-add-edit-view-form-strength-of-connection-slider" readOnly />
                                        <div id="strengthDescription" className="contact-add-edit-view-form-strenght-of-connection-description">{ratingText[contact.strengthOfConnection]}</div>
                                    </div>
                                    {/* Referral Potential */}
                                    <div className="contact-add-edit-view-form-div-attribute">
                                        <label>Referral Potential</label>
                                        <label className="contact-add-edit-view-form-label-referral-checkbox">
                                            <input type="checkbox" name="referralPotential" checked={contact.referralPotential} className='contact-add-edit-view-form-input-referral-checkbox' readOnly />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Form Footer for the buttons */}
                            <div className="contact-add-edit-view-form-footer">
                                <span className='contact-add-edit-view-form-required-input-label'>* Required Information *</span>
                                <div></div>
                                <button type="button" className="view-contact-show-summary-detail-button" onClick={handleView} >Show Summary</button>
                            </div>

                            {/* FORM END */}
                        </form>
                    </>

                )}
            </div>
        </div>
    );
};

export default ViewContactModal;