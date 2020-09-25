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
  },
});

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.published();
    t.model.author();
    t.model.authorId();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.post();
    t.crud.user();
    t.crud.users();

    t.list.field("feed", {
      type: Post,
      resolve: (_, args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        });
      },
    });

    t.list.field("filterPosts", {
      type: Post,
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        });
      },
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser({ alias: "signupUser" });
    t.crud.deleteOnePost();

    t.field("createDraft", {
      type: Post,
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg({ nullable: false }),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });

    t.field("publish", {
      type: Post,
      nullable: true,
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id: Number(id) },
          data: { published: true },
        });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, Post, User],
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
