// Contact card to display contacts
const ContactsCard = ({ contact, onViewClick, onEditClick, onDeleteClick }) => {
    return (
        <div className="contact-card">
            <div className="contact-card-content">
                <h3>{contact.name}</h3>
                <p>{contact.company}</p>
                <p>{contact.email}</p>
                <div className="contact-card-actions">
                    <button onClick={() => onViewClick(contact)}>View</button>
                    <button onClick={() => onEditClick(contact)}>Edit</button>
                    <button onClick={() => onDeleteClick(contact)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ContactsCard;