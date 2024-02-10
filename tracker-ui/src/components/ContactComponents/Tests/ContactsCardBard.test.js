import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactsCard from '../ContactsCard';

// Mock data for testing
const mockContact = {
    name: 'John Doe',
    company: 'Awesome Inc.',
    email: 'johndoe@awesome.com',
};

// Mock handlers for button clicks
const onViewClickMock = jest.fn();
const onEditClickMock = jest.fn();
const onDeleteClickMock = jest.fn();

describe('ContactsCard', () => {
    // Basic rendering test
    test('renders contact details correctly', () => {
        render(<ContactsCard contact={mockContact} />);

        expect(screen.getByText(mockContact.name)).toBeInTheDocument();
        expect(screen.getByText(mockContact.company)).toBeInTheDocument();
        expect(screen.getByText(mockContact.email)).toBeInTheDocument();
    });

    // Button click tests
    test('calls onViewClick on View button click', () => {
        render(<ContactsCard contact={mockContact} onViewClick={onViewClickMock} />);

        fireEvent.click(screen.getByText('View'));

        expect(onViewClickMock).toHaveBeenCalledWith(mockContact);
    });

    test('calls onEditClick on Edit button click', () => {
        render(
            <ContactsCard contact={mockContact} onEditClick={onEditClickMock} />
        );

        fireEvent.click(screen.getByText('Edit'));

        expect(onEditClickMock).toHaveBeenCalledWith(mockContact);
    });

    test('calls onDeleteClick on Delete button click', () => {
        render(
            <ContactsCard contact={mockContact} onDeleteClick={onDeleteClickMock} />
        );

        fireEvent.click(screen.getByText('Delete'));

        expect(onDeleteClickMock).toHaveBeenCalledWith(mockContact);
    });

    // Snapshot testing (optional)
    test('matches snapshot', () => {
        const { asFragment } = render(<ContactsCard contact={mockContact} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
