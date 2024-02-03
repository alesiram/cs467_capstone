// Modal to view a contact
const ViewContactModal = ({ show, onClose, contact }) => {

    // Return null if not displaying
    if (!show) return null;

    return (
        <div className="view-contact-modal">
            <div className="view-contact-modal-content">
                <span className="view-contact-modal-close" onClick={onClose}>&times;</span>
                <h3>Contact Details</h3>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Company:</strong> {contact.company}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <div className="view-contact-modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ViewContactModal;