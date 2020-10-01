/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType, intArg } from "@nexus/schema";

export const MatchReport = objectType({
  name: "MatchReport",
  definition(t) {
    t.model.matchId();
    t.model.result();
    t.model.winnerId();
  },
});

export const MatchReportQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.match_Report();
    t.crud.match_Reports();

    t.list.field("filterMatchReport", {
      type: MatchReport,
      args: {
        id: intArg({ nullable: true }),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.match_Report.findMany({
          where: { matchId: id },
        });
      },
    });
  },
});

export const MatchReportMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneMatchReport({ alias: "createOneMatchReport" });
  },
});
