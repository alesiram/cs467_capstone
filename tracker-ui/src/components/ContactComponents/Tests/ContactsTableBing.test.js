// Import the necessary modules
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactsTable from '../ContactsTable';

// Define some mock data and functions
const mockContacts = [
    {
        _id: '1',
        name: 'Alice Smith',
        company: 'XYZ Ltd.',
        email: 'alice.smith@example.com',
        phoneNumbers: [
            { type: 'Home', number: '111-1111' },
            { type: 'Work', number: '222-2222' }
        ],
        contactType: 'Personal'
    },
    {
        _id: '2',
        name: 'Bob Jones',
        company: 'ABC Inc.',
        email: 'bob.jones@example.com',
        phoneNumbers: [
            { type: 'Mobile', number: '333-3333' }
        ],
        contactType: 'Business'
    }
];

const mockOnViewClick = jest.fn();
const mockOnEditClick = jest.fn();
const mockOnDeleteClick = jest.fn();

// Describe the test suite
describe('ContactsTable', () => {
    // Test that the component renders correctly
    test('renders contacts table with headers, rows and actions', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsTable
                contacts={mockContacts}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Expect the table headers to be in the document
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Contact Type')).toBeInTheDocument();

        // Expect the table rows to be in the document
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.getByText('XYZ Ltd.')).toBeInTheDocument();
        expect(screen.getByText('alice.smith@example.com')).toBeInTheDocument();
        expect(screen.getByText('Home: 111-1111')).toBeInTheDocument();
        expect(screen.getByText('Work: 222-2222')).toBeInTheDocument();
        expect(screen.getByText('Personal')).toBeInTheDocument();

        expect(screen.getByText('Bob Jones')).toBeInTheDocument();
        expect(screen.getByText('ABC Inc.')).toBeInTheDocument();
        expect(screen.getByText('bob.jones@example.com')).toBeInTheDocument();
        expect(screen.getByText('Mobile: 333-3333')).toBeInTheDocument();
        expect(screen.getByText('Business')).toBeInTheDocument();

        // Expect the table actions to be in the document
        expect(screen.getAllByText('View').length).toBe(2);
        expect(screen.getAllByText('Edit').length).toBe(2);
        expect(screen.getAllByText('Delete').length).toBe(2);
    });

    // Test that the onViewClick function is called when the View button is clicked
    test('calls onViewClick when View button is clicked', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsTable
                contacts={mockContacts}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Find the View buttons and click them
        const viewButtons = screen.getAllByText('View');
        fireEvent.click(viewButtons[0]);
        fireEvent.click(viewButtons[1]);

        // Expect the onViewClick function to be called with the mock contacts
        expect(mockOnViewClick).toHaveBeenCalledTimes(2);
        expect(mockOnViewClick).toHaveBeenCalledWith(mockContacts[0]);
        expect(mockOnViewClick).toHaveBeenCalledWith(mockContacts[1]);
    });

    // Test that the onEditClick function is called when the Edit button is clicked
    test('calls onEditClick when Edit button is clicked', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsTable
                contacts={mockContacts}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Find the Edit buttons and click them
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);
        fireEvent.click(editButtons[1]);

        // Expect the onEditClick function to be called with the mock contacts
        expect(mockOnEditClick).toHaveBeenCalledTimes(2);
        expect(mockOnEditClick).toHaveBeenCalledWith(mockContacts[0]);
        expect(mockOnEditClick).toHaveBeenCalledWith(mockContacts[1]);
    });

    // Test that the onDeleteClick function is called when the Delete button is clicked
    test('calls onDeleteClick when Delete button is clicked', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsTable
                contacts={mockContacts}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Find the Delete buttons and click them
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        fireEvent.click(deleteButtons[1]);

        // Expect the onDeleteClick function to be called with the mock contacts
        expect(mockOnDeleteClick).toHaveBeenCalledTimes(2);
        expect(mockOnDeleteClick).toHaveBeenCalledWith(mockContacts[0]);
        expect(mockOnDeleteClick).toHaveBeenCalledWith(mockContacts[1]);
    });
});
