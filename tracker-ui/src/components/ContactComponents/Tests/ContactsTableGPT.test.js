import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactsTable from '../ContactsTable';

// Mock data for contacts
const contacts = [
    {
        _id: '1',
        name: 'John Doe',
        company: 'Doe Enterprises',
        email: 'john@doe.com',
        phoneNumbers: [{ type: 'Mobile', number: '123-456-7890' }],
        contactType: 'Personal'
    },
];

// Mock functions for click handlers
const mockOnViewClick = jest.fn();
const mockOnEditClick = jest.fn();
const mockOnDeleteClick = jest.fn();

describe('ContactsTable', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        mockOnViewClick.mockClear();
        mockOnEditClick.mockClear();
        mockOnDeleteClick.mockClear();
    });

    test('renders contact details for each contact', () => {
        render(
            <ContactsTable
                contacts={contacts}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Check table headers
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Contact Type')).toBeInTheDocument();

        // Check for contact details in the table
        contacts.forEach(contact => {
            expect(screen.getByText(contact.name)).toBeInTheDocument();
            expect(screen.getByText(contact.company)).toBeInTheDocument();
            expect(screen.getByText(contact.email)).toBeInTheDocument();
            expect(screen.getByText(`${contact.phoneNumbers[0].type}: ${contact.phoneNumbers[0].number}`)).toBeInTheDocument();
            expect(screen.getByText(contact.contactType)).toBeInTheDocument();
        });
    });

    test('calls onViewClick when View button is clicked for a contact', () => {
        render(
            <ContactsTable
                contacts={contacts}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Simulate clicking the "View" button for the first contact
        fireEvent.click(screen.getAllByText('View')[0]);
        expect(mockOnViewClick).toHaveBeenCalledWith(contacts[0]);
    });

});
