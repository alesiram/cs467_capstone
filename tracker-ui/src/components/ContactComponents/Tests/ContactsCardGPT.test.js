import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactsCard from '../ContactsCard';

describe('ContactsCard', () => {
    // Mock contact data
    const contact = {
        name: 'John Doe',
        company: 'Doe Enterprises',
        email: 'john@doe.com'
    };

    // Mock functions to simulate passing handlers
    const mockOnViewClick = jest.fn();
    const mockOnEditClick = jest.fn();
    const mockOnDeleteClick = jest.fn();

    test('displays contact information', () => {
        render(
            <ContactsCard
                contact={contact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Assert that the contact information is displayed
        expect(screen.getByText(contact.name)).toBeInTheDocument();
        expect(screen.getByText(contact.company)).toBeInTheDocument();
        expect(screen.getByText(contact.email)).toBeInTheDocument();
    });

    test('calls onViewClick when View button is clicked', () => {
        render(
            <ContactsCard
                contact={contact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Simulate clicking the "View" button
        fireEvent.click(screen.getByText('View'));
        expect(mockOnViewClick).toHaveBeenCalledWith(contact);
    });

    test('calls onEditClick when Edit button is clicked', () => {
        render(
            <ContactsCard
                contact={contact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Simulate clicking the "Edit" button
        fireEvent.click(screen.getByText('Edit'));
        expect(mockOnEditClick).toHaveBeenCalledWith(contact);
    });

    test('calls onDeleteClick when Delete button is clicked', () => {
        render(
            <ContactsCard
                contact={contact}
                onViewClick={mockOnViewClick}
                onEditClick={mockOnEditClick}
                onDeleteClick={mockOnDeleteClick}
            />
        );

        // Simulate clicking the "Delete" button
        fireEvent.click(screen.getByText('Delete'));
        expect(mockOnDeleteClick).toHaveBeenCalledWith(contact);
    });
});
