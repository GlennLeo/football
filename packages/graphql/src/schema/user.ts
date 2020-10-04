/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType, stringArg } from "@nexus/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";

const expiresIn = "7 days";

export const UserAccount = objectType({
  name: "UserAccount",
  definition(t) {
    t.model("User").id();
    t.model("User").name();
    t.model("User").email();
    t.model("User").phone();
    t.model("User").address();
    t.list.field("teams", { type: "Team", nullable: true });
    t.string("password", { nullable: false });
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.phone();
    t.model.address();
    t.model.team({ alias: "teams" });
  },
});

export const AuthUser = objectType({
  name: "AuthUser",
  definition(t) {
    t.field("user", { type: "UserAccount" }), t.string("token");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.user({
      async resolve(_, args, ctx, info, originalResolver) {
        if (!ctx.authUser) {
          throw new Error("Unauthorized!!!");
        }
        const user = await originalResolver(_, args, ctx, info);
        return user;
      },
    });
    t.crud.users({
      async resolve(_, args, ctx, info, originalResolver) {
        if (!ctx.authUser) {
          throw new Error("Unauthorized!!!");
        }
        const users = await originalResolver(_, args, ctx, info);
        return users;
      },
    });
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
        address: stringArg(),
      },
      resolve: async (_, { email, name, password, phone, address }, ctx) => {
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
            address,
          },
        });
        const token = jwt.sign(
          { id: user.id, email: user.email },
          config.TOKEN_SECRET,
          { expiresIn }
        );
        return {
          user,
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
          const token = jwt.sign(
            { id: existingUser.id, email: existingUser.email },
            config.TOKEN_SECRET,
            { expiresIn }
          );
          let members = await ctx.prisma.member.findMany({
            where: { member_id: existingUser.id },
            include: {
              team: true,
            },
          });
          const teams = members.map((item) => item.team);
          const user = { ...existingUser, teams };
          return {
            user,
            token: token,
          };
        }
        throw new Error("ERROR: Invalid password.");
      },
    });
  },
});
