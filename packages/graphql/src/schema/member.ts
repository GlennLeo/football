/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType } from "@nexus/schema";

export const Member = objectType({
  name: "Member",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.team();
    t.model.role();
    t.model.cash();
  },
});

export const MemberQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.member();
    t.crud.members();
  },
});

export const MemberMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneMember({ alias: "createNewMember" });
  },
});
