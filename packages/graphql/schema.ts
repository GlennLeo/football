/// <reference path="./generated/nexus.ts" />
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema } from "@nexus/schema";
import * as allTypes from "./src";

export const schema = makeSchema({
  types: allTypes,
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + "./generated/schema.graphql",
    typegen: __dirname + "./generated/nexus.ts",
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
