// Modal to confirm deletion of a contact
const DeleteContactModal = ({ show, onClose, confirmDeletion }) => {

    // Return null if not displaying
    if (!show) return null;

    return (
        <div className="delete-contact-modal">
            <div className="delete-contact-modal-content">
                <div className="delete-contact-modal-body">
                    <p>Are you sure you want to delete this contact?</p>
                </div>
                <div className="delete-contact-modal-footer">
                    <button className="delete-contact-modal-delete-button" onClick={confirmDeletion}>Delete</button>
                    <button className="delete-contact-modal-cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteContactModal;