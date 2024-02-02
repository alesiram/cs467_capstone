import Contact from '../models/contact_model.mjs';

// Create a new contact
export const createContact = async (req, res) => {
    try {
        // Create contact from request body
        const newContact = new Contact({
            ...req.body,
            user: req.user._id
        });
        // Save and send contact
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        // Handle error
        res.status(400).json({ message: error.message });
    }
};

// Get a particular contact
export const getContact = async (req, res) => {
    try {
        // Find contact from route param :_id
        const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
        // If contact not found
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        // Send contact
        res.status(200).json(contact);
    } catch (error) {
        // Handle error
        res.status(500).json({ message: error.message });
    }
};

// Get all contacts for the authenticated user
export const getContacts = async (req, res) => {
    try {
        // Find all contacts
        const contacts = await Contact.find({ user: req.user._id });
        // Send all contacts
        res.status(200).json(contacts);
    } catch (error) {
        // Handle error
        res.status(500).json({ message: error.message });
    }
};

// Update a contact
export const updateContact = async (req, res) => {
    try {
        // Find contact from route param :_id, and update the contact
        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        // If contact not found
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found to update' });
        }
        // Send updated contact
        res.status(200).json(contact);
    } catch (error) {
        // Handle error
        res.status(400).json({ message: error.message });
    }
};

// Delete a contact
export const deleteContact = async (req, res) => {
    try {
        // Find contact from route param :_id, and delete the contact
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        // If contact not found
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found to delete' });
        }
        // Send message to confirm deletion
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        // Handle error
        res.status(500).json({ message: error.message });
    }
};