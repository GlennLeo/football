/// <reference path="../../generated/nexus.ts" />
import { extendType, intArg, objectType } from "@nexus/schema";

export const PlayerReport = objectType({
  name: "PlayerReport",
  definition(t) {
    t.model.id();
    t.model.match();
    t.model.user();
    t.model.score();
    t.model.assist();
  },
});

export const PlayerReportQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.playerReport();
    t.crud.playerReport();
  },
});

export const PlayerReportMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createNewPlayerReport", {
      type: PlayerReport,
      args: {
        match_id: intArg({ nullable: false }),
        user_id: intArg({ nullable: false }),
        score: intArg({ nullable: false }),
        assist: intArg({ nullable: false }),
      },
      resolve: async (_, { match_id, user_id, score, assist }, ctx) => {
        if (!ctx.authUser) {
          throw new Error("Unauthorized!!!");
        }
        const playerReport = await ctx.prisma.playerReport.create({
          data: {
            match: {
              connect: {
                id: match_id,
              },
            },
            user: {
              connect: {
                id: user_id,
              },
            },
            score,
            assist,
          },
          include: {
            match: true,
            user: true,
          },
        });
        return playerReport;
      },
    });
  },
});
