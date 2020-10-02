/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType } from "@nexus/schema";

export const PlayerReport = objectType({
  name: "PlayerReport",
  definition(t) {
    t.model.id();
    t.model.match_id();
    t.model.player_id();
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
    t.crud.createOnePlayerReport({ alias: "createNewPlayerReport" });
  },
});
