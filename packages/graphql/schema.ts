/// <reference path="./generated/nexus.ts" />
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import {
  intArg,
  makeSchema,
  mutationType,
  objectType,
  queryType,
  stringArg,
} from "@nexus/schema";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
    t.model.phone();
  },
});

const Team = objectType({
  name: "Team",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.logo();
    t.model.description();
    t.model.win();
    t.model.loose();
    t.model.home();
    t.model.creatorId();
  },
});

const Match = objectType({
  name: "Match",
  definition(t) {
    t.model.id();
    t.model.homeId();
    t.model.guestId();
    t.model.field();
    t.model.date();
    t.model.location();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.team();
    t.crud.teams();
    t.crud.user();
    t.crud.users();

    t.list.field("filterTeam", {
      type: Team,
      args: {
        name: stringArg({ nullable: true }),
      },
      resolve: (_, { name }, ctx) => {
        return ctx.prisma.team.findMany({
          where: { name },
        });
      },
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser({ alias: "signupUser" });
    t.crud.createOneTeam({ alias: "createOneTeam" });
    t.crud.createOneMatch();

    // t.field("createOneMatch", {
    //   type: Match,
    //   args: {
    //     homeId: intArg({ nullable: false }),
    //     guestId: stringArg(),
    //     field: stringArg({ nullable: false }),
    //     location: stringArg({ nullable: false }),
    //     date: stringArg({ nullable: false }),
    //   },
    //   resolve: (_, { homeId, guestId, field, location, date }, ctx) => {
    //     return ctx.prisma.match.create({
    //       data: {
    //         Team_Match_homeIdToTeam,
    //         guestId,
    //         field,
    //         location,
    //         date,
    //       },
    //     });
    //   },
    // });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User, Team, Match],
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
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
