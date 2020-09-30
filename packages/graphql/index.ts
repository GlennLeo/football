import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { createContext } from "./context";

const server = new ApolloServer({ schema, context: createContext });

export default server;
