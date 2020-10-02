/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType } from "@nexus/schema";

export const Match = objectType({
  name: "Match",
  definition(t) {
    t.model.id();
    t.model.home_id();
    t.model.away_id();
    t.model.field();
    t.model.location();
    t.model.time();
    t.model.created_at();
    t.model.updated_at();
  },
});

export const MatchQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.match();
    t.crud.matches();
  },
});

export const MatchMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneMatch({ alias: "createNewMatch" });
  },
});
