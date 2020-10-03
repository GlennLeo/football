/// <reference path="../../generated/nexus.ts" />
import { extendType, intArg, objectType, stringArg } from "@nexus/schema";

export const MatchReport = objectType({
  name: "MatchReport",
  definition(t) {
    t.model.id();
    t.model.match();
    t.model.result();
    t.field("winner", { type: "Team" });
    t.field("loss", { type: "Team" });
  },
});

export const MatchReportQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.matchReport();
    t.crud.matchReports();
  },
});

export const MatchReportMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createNewMatchReport", {
      type: MatchReport,
      args: {
        match_id: intArg({ nullable: false }),
        winner_id: intArg({ nullable: false }),
        loss_id: intArg({ nullable: false }),
        result: stringArg({ nullable: false }),
      },
      resolve: async (_, { match_id, winner_id, loss_id, result }, ctx) => {
        if (!ctx.authUser) {
          throw new Error("Unauthorized!!!");
        }
        const matchReport = await ctx.prisma.matchReport.create({
          data: {
            match: {
              connect: {
                id: match_id,
              },
            },
            team_match_report_winner_idToteam: {
              connect: {
                id: winner_id,
              },
            },
            team_match_report_loss_idToteam: {
              connect: {
                id: loss_id,
              },
            },
            result,
          },
          include: {
            team_match_report_loss_idToteam: true,
            team_match_report_winner_idToteam: true,
          },
        });
        return {
          ...matchReport,
          winner: matchReport.team_match_report_winner_idToteam,
          loss: matchReport.team_match_report_loss_idToteam,
        };
      },
    });
  },
});
