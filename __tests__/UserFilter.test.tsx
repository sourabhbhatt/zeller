import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserFilter from '../src/components/UserFilter';

describe('UserFilter Component', () => {
  it('renders user filter options', () => {
    const {getByText} = render(<UserFilter setUserType={() => {}} />);
    expect(getByText('Admin')).toBeTruthy();
    expect(getByText('Manager')).toBeTruthy();
  });

  it('calls setUserType when a filter option is selected', () => {
    const mockSetUserType = jest.fn();
    const {getByText} = render(<UserFilter setUserType={mockSetUserType} />);
    fireEvent.press(getByText('Admin'));
    expect(mockSetUserType).toHaveBeenCalledWith('Admin');
  });
});
