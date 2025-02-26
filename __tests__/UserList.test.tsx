import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import UserList from '../src/components/UserList';
import {GET_USERS} from '../src/graphql/queries';

const mockData = {
  request: {query: GET_USERS, variables: {role: {eq: 'ADMIN'}}},
  result: {
    data: {
      listZellerCustomers: {
        items: [
          {id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin'},
        ],
        nextToken: null,
      },
    },
  },
};

describe('UserList Component', () => {
  it('renders users correctly', async () => {
    const {getByText} = render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <UserList userType="ADMIN" searchQuery="" setSearchQuery={() => {}} />
      </MockedProvider>,
    );

    await waitFor(() => getByText('John Doe'));

    expect(getByText('John Doe')).toBeTruthy();
  });
});
