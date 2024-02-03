// ContactsSearchBar (PLACEHOLDER)
const ContactsSearchBar = ({ onSearch }) => {
    return (
        <div className="contact-search-bar">
            <input
                type="text"
                placeholder="Search contacts..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default ContactsSearchBar;
