import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "isomorphic-unfetch";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URI,
  credentials: "same-origin",
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
  });
}
