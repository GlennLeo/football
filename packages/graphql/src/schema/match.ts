/// <reference path="../../generated/nexus.ts" />
import { extendType, intArg, objectType } from "@nexus/schema";

export const Match = objectType({
  name: "Match",
  definition(t) {
    t.model.id();
    t.model.homeId();
    t.model.guestId();
    t.model.field();
    t.model.location();
    t.model.date();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const MatchQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.match();
    t.crud.matchs();

    t.list.field("filterMatch", {
      type: Match,
      args: {
        homeId: intArg({ nullable: true }),
      },
      resolve: (_, { homeId }, ctx) => {
        return ctx.prisma.match.findMany({
          where: { homeId },
        });
      },
    });
  },
});

export const MatchMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneMatch({ alias: "createNewMatch" });
  },
});
