// Contact table to display contacts
const ContactsTable = ({ contacts, onEditClick, onDeleteClick, onViewClick }) => {
    return (
        <div className="contact-table-container">
            <h2>Contacts</h2>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Contact Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact._id}>
                            <td>{contact.name}</td>
                            <td>{contact.company}</td>
                            <td>{contact.email}</td>
                            <td>
                                {/* Iterate through each phone number and type */}
                                {contact.phoneNumbers.map((phone, index) => (
                                    <span key={`${contact._id}-${index}`} className="contact-phone-number">
                                        {phone.type}: {phone.number}<br />
                                    </span>
                                ))}
                            </td>
                            <td>{contact.contactType}</td>
                            <td className="contact-action-buttons">
                                <button onClick={() => onViewClick(contact)}>View</button>
                                <button onClick={() => onEditClick(contact)}>Edit</button>
                                <button onClick={() => onDeleteClick(contact)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactsTable;