/// <reference path="./generated/nexus.ts" />
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import {
  makeSchema,
  mutationType,
  objectType,
  queryType,
  stringArg,
} from "@nexus/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = "secret";
const expiresIn = "1 day";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.phone();
    t.string("password", { nullable: true });
  },
});

const AuthUser = objectType({
  name: "AuthUser",
  definition(t) {
    t.field("user", { type: "User" }), t.string("token");
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
    t.crud.createOneTeam({ alias: "createOneTeam" });
    t.crud.createOneMatch();

    t.field("signup", {
      type: AuthUser,
      nullable: true,
      args: {
        email: stringArg({ required: true }),
        name: stringArg(),
        password: stringArg({ required: true }),
        phone: stringArg(),
      },
      resolve: async (_, { email, name, password, phone }, ctx) => {
        const existingUser = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        });
        if (existingUser) {
          throw new Error("ERROR: Username already used.");
        }
        var hash = bcrypt.hashSync(password, 10);

        const user = await ctx.prisma.user.create({
          data: {
            email,
            phone,
            name,
            password: hash,
          },
        });
        const token = jwt.sign(user.email, TOKEN_SECRET, { expiresIn });
        const cloneUser = { ...user };
        delete cloneUser.password;
        return {
          user: cloneUser,
          token: token,
        };
      },
    });
    t.field("login", {
      type: AuthUser,
      nullable: true,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (_, { email, password }, ctx) => {
        const existingUser = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        });
        if (!existingUser) {
          throw new Error("ERROR: User not exist.");
        }
        var isValidPassword = bcrypt.compareSync(
          password,
          existingUser.password
        );
        if (isValidPassword) {
          const token = jwt.sign(existingUser.email, TOKEN_SECRET);
          const cloneUser = { ...existingUser };
          delete cloneUser.password;
          return {
            user: cloneUser,
            token: token,
          };
        }
        throw new Error("ERROR: Invalid password.");
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User, AuthUser, Team, Match],
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
