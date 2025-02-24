import React from 'react';
import {render} from '@testing-library/react-native';
import UserListItem from '../src/components/UserListItem';

describe('UserListItem', () => {
  it('renders user name and role correctly', () => {
    const {getByText} = render(
      <UserListItem name="sourabh bhatt" role="Admin" />,
    );
    expect(getByText('sourabh bhatt')).toBeTruthy();
    expect(getByText('Admin')).toBeTruthy();
  });

  it('handles missing name and role correctly', () => {
    const {getByText} = render(<UserListItem name="" role="" />);
    expect(getByText('Unknown')).toBeTruthy();
    expect(getByText('Role Unknown')).toBeTruthy();
  });
  
});
