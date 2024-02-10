import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactsTable from '../ContactsTable';

// Mock data for testing
const mockContacts = [
    {
        _id: '1',
        name: 'John Doe',
        company: 'Awesome Inc.',
        email: 'johndoe@awesome.com',
        phoneNumbers: [{ type: 'mobile', number: '123-456-7890' }],
        contactType: 'Client',
    },
    {
        _id: '2',
        name: 'Jane Smith',
        company: 'Super Company',
        email: 'janesmith@super.com',
        phoneNumbers: [
            { type: 'mobile', number: '987-654-3210' },
            { type: 'work', number: '555-555-5555' },
        ],
        contactType: 'Vendor',
    },
];

// Mock handlers for button clicks
const onViewClickMock = jest.fn();

describe('ContactsTable', () => {
    // Basic rendering test
    test('renders contacts table with headers and data', () => {
        render(
            <ContactsTable contacts={mockContacts} onViewClick={onViewClickMock} />
        );

        expect(screen.getByText('Contacts')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Contact Type')).toBeInTheDocument();
        expect(screen.getAllByRole('row').length).toBe(3); // header + 2 contacts
    });

});