import React from 'react';
import { render, screen, within } from '@testing-library/react';
import TableView from './table-view';
import { Gender, IEmployee } from '../../definitions/interfaces/employee-interface';

// Mock employee data
const employees = [
  {
    id: "1",
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    gender: Gender.Male,
    photo: '/path/to/photo1.jpg'
  },
  {
    id: "2",
    firstName: 'Jane',
    lastName: 'max',
    email: 'jane.doe@example.com',
    phoneNumber: '987-654-3210',
    gender: Gender.Female,
    photo: '/path/to/photo2.jpg'
  }
];

describe('TableView Component', () => {
  test('renders correct number of rows and checks data presence', () => {
    render(<TableView employees={employees} onEdit={() => { }} onDelete={() => { }} />);

    // Check if the correct number of rows are rendered (2 employees)
    const rows = within(screen.getByTestId('table-data')).getAllByRole('row');
    expect(rows).toHaveLength(2);

    // Check if the data is present in the document
    employees.forEach(employee => {
      expect(screen.getByRole('cell', { name: employee.firstName })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: employee.lastName })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: employee.email })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: employee.phoneNumber })).toBeInTheDocument();
      const genderText = employee.gender === Gender.Male ? 'Male' : 'Female';
      expect(screen.getByRole('cell', { name: genderText })).toBeInTheDocument();
    });

  });
});
