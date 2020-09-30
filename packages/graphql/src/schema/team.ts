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
    t.model.loose();
    t.model.home();
    t.model.creatorId();
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
    t.crud.createOneTeam({ alias: "createOneTeam" });
  },
});
