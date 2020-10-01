/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType, stringArg } from "@nexus/schema";

export const Team = objectType({
  name: "Team",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.logo();
    t.model.description();
    t.model.win();
    t.model.loss();
    t.model.home();
    t.model.creator_id();
  },
});

export const TeamQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.team();
    t.crud.teams();

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

export const TeamMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createNewTeam", {
      type: Team,
      nullable: true,
      args: {
        name: stringArg({ required: true }),
        logo: stringArg(),
        description: stringArg(),
        home: stringArg(),
      },
      resolve: async (_, { name, logo, description, home }, ctx) => {
        if (!ctx.authUser) {
          throw new Error("Unauthorized!!!");
        }
        const team = await ctx.prisma.team.create({
          data: {
            name,
            logo,
            description,
            home,
            user: {
              connect: {
                id: ctx.authUser.id,
              },
            },
          },
        });
        return team;
      },
    });
  },
});
