import {gql} from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers($limit: Int, $nextToken: String) {
    listZellerCustomers(limit: $limit, nextToken: $nextToken) {
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

export const GET_USERS = gql`
  query GetUsers($role: TableStringFilterInput, $name: TableStringFilterInput) {
    listZellerCustomers(filter: {role: $role, name: $name}) {
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

export const createUser = gql`
  mutation CreateUser($name: String!, $email: String!, $role: String!) {
    createUser(name: $name, email: $email, role: $role) {
      id
      name
      email
    }
  }
`;
