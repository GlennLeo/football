import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        name
        phone
        address
        teams {
          id
          name
        }
      }
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String
    $phone: String
    $address: String
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      phone: $phone
      address: $address
    ) {
      user {
        id
        email
        name
        phone
        address
        teams {
          id
          name
        }
      }
      token
    }
  }
`;
