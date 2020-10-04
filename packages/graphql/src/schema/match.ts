/// <reference path="../../generated/nexus.ts" />
import { extendType, intArg, objectType, stringArg } from "@nexus/schema";

export const Match = objectType({
  name: "Match",
  definition(t) {
    t.model.id();
    t.model.field();
    t.model.location();
    t.model.time();
    t.model.status();
    t.model.created_at();
    t.model.updated_at();
    t.field("home", { type: "Team" });
    t.field("away", { type: "Team" });
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
    t.field("createNewMatch", {
      type: Match,
      args: {
        away_id: intArg({ nullable: true }),
        home_id: intArg({ nullable: false }),
        field: stringArg({ nullable: false }),
        location: stringArg({ nullable: false }),
      },
      resolve: async (_, { away_id, home_id, field, location }, ctx) => {
        if (!ctx.authUser) {
          throw new Error("Unauthorized!!!");
        }
        const members = await ctx.prisma.member.findMany({
          where: { member_id: ctx.authUser.id, team_id: home_id },
          select: { role: true },
          take: 1,
        });
        if (members[0].role !== "MANAGER") {
          throw new Error("Unauthorized!!!");
        }
        const match = await ctx.prisma.match.create({
          data: {
            team_match_away_idToteam: {
              connect: {
                id: away_id,
              },
            },
            team_match_home_idToteam: {
              connect: {
                id: home_id,
              },
            },
            field,
            location,
            time: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
          },
          include: {
            team_match_away_idToteam: true,
            team_match_home_idToteam: true,
          },
        });
        return {
          ...match,
          home: match.team_match_home_idToteam,
          away: match.team_match_away_idToteam,
        };
      },
    });
  },
});
