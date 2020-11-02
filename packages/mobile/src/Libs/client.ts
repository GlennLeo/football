import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:80',
  cache: new InMemoryCache(),
});
