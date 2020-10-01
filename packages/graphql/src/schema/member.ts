/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType, intArg } from "@nexus/schema";

export const Member = objectType({
  name: "Member",
  definition(t) {
    t.model.id();
    t.model.memberId();
    t.model.teamId();
    t.model.role();
    t.model.fee_status();
  },
});

export const MemberQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.member();
    t.crud.members();

    t.list.field("filterMember", {
      type: Member,
      args: {
        memberId: intArg({ nullable: true }),
        teamId: intArg({ nullable: true }),
      },
      resolve: (_, { memberId, teamId }, ctx) => {
        return ctx.prisma.member.findMany({
          where: { memberId, teamId },
        });
      },
    });
  },
});

export const MemberMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneMember({ alias: "createOneMember" });
  },
});
