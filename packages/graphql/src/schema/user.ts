/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType, stringArg } from "@nexus/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";

const expiresIn = "1 day";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.phone();
    t.string("password", { nullable: true });
  },
});

export const AuthUser = objectType({
  name: "AuthUser",
  definition(t) {
    t.field("user", { type: "User" }), t.string("token");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.user();
    t.crud.users();
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
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
        const token = jwt.sign(user.email, config.TOKEN_SECRET, { expiresIn });
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
          const token = jwt.sign(existingUser.email, config.TOKEN_SECRET);
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
