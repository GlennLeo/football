/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType } from "@nexus/schema";

export const MatchReport = objectType({
  name: "MatchReport",
  definition(t) {
    t.model.match_id();
    t.model.result();
    t.model.winner_id();
    t.model.loss_id();
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
    t.crud.createOneMatchReport({ alias: "createNewMatchReport" });
  },
});
