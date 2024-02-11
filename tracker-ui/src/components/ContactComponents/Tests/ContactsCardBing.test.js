// Import the necessary modules
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactsCard from '../ContactsCard';

// Define some mock data and functions
const mockContact = {
    name: 'John Doe',
    company: 'ABC Inc.',
    email: 'john.doe@example.com'
};

const mockOnViewClick = jest.fn();
const mockOnEditClick = jest.fn();
const mockOnDeleteClick = jest.fn();

// Describe the test suite
describe('ContactsCard', () => {
    // Test that the component renders correctly
    test('renders contact card with name, company, email and actions', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsCard
                contact={mockContact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Expect the contact details and actions to be in the document
        expect(screen.getByText(mockContact.name)).toBeInTheDocument();
        expect(screen.getByText(mockContact.company)).toBeInTheDocument();
        expect(screen.getByText(mockContact.email)).toBeInTheDocument();
        expect(screen.getByText('View')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    // Test that the onViewClick function is called when the View button is clicked
    test('calls onViewClick when View button is clicked', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsCard
                contact={mockContact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Find the View button and click it
        const viewButton = screen.getByText('View');
        fireEvent.click(viewButton);

        // Expect the onViewClick function to be called with the mock contact
        expect(mockOnViewClick).toHaveBeenCalledWith(mockContact);
    });

    // Test that the onEditClick function is called when the Edit button is clicked
    test('calls onEditClick when Edit button is clicked', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsCard
                contact={mockContact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Find the Edit button and click it
        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);

        // Expect the onEditClick function to be called with the mock contact
        expect(mockOnEditClick).toHaveBeenCalledWith(mockContact);
    });

    // Test that the onDeleteClick function is called when the Delete button is clicked
    test('calls onDeleteClick when Delete button is clicked', () => {
        // Render the component with the mock data and functions
        render(
            <ContactsCard
                contact={mockContact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Find the Delete button and click it
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        // Expect the onDeleteClick function to be called with the mock contact
        expect(mockOnDeleteClick).toHaveBeenCalledWith(mockContact);
    });
});
