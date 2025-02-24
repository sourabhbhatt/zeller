import {gql} from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($role: TableStringFilterInput) {
    listZellerCustomers(filter: {role: $role}) {
      items {
        id
        name
        email
        role
      }
      nextToken
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: String!) {
    getZellerCustomer(id: $id) {
      id
      name
      email
      role
    }
  }
`;
