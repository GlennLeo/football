import {gql} from '@apollo/client';

export const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;
