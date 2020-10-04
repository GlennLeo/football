/// <reference path="../../generated/nexus.ts" />
import { enumType, extendType, intArg, objectType } from "@nexus/schema";

export const MemberRole = enumType({
  name: "MemberRole",
  members: ["PENDING", "MANAGER", "MEMBER"],
});

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
    t.field("createNewMember", {
      type: Member,
      args: {
        user_id: intArg({ nullable: false }),
        team_id: intArg({ nullable: false }),
        role: MemberRole,
        cash: intArg({ nullable: false }),
      },
      resolve: async (_, { user_id, team_id, role, cash }, ctx) => {
        if (!ctx.authUser) {
          throw new Error("Unauthorized!!!");
        }
        const members = await ctx.prisma.member.findMany({
          where: { member_id: ctx.authUser.id, team_id: team_id },
          select: { role: true },
          take: 1,
        });
        if (members[0] && members[0].role !== "MANAGER") {
          throw new Error("Unauthorized!!!");
        }
        const member = await ctx.prisma.member.create({
          data: {
            user: {
              connect: {
                id: user_id,
              },
            },
            team: {
              connect: {
                id: team_id,
              },
            },
            role,
            cash,
          },
          include: {
            user: true,
            team: true,
          },
        });
        return member;
      },
    });
  },
});
