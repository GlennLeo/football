import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "isomorphic-unfetch";

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: process.env.GRAPHQL_URI,
      credentials: "same-origin",
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}
