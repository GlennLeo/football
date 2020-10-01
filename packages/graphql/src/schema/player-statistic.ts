/// <reference path="../../generated/nexus.ts" />
import { extendType, objectType, intArg } from "@nexus/schema";

export const PlayerStatistic = objectType({
  name: "PlayerStatistic",
  definition(t) {
    t.model.id();
    t.model.matchId();
    t.model.playerId();
    t.model.score();
    t.model.assist();
  },
});

export const PlayerStatisticQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.player_Statistic();
    t.crud.player_Statistics();

    t.list.field("filterPlayerStatistic", {
      type: PlayerStatistic,
      args: {
        playerId: intArg({ nullable: true }),
      },
      resolve: (_, { playerId }, ctx) => {
        return ctx.prisma.player_Statistics.findMany({
          where: { playerId: playerId },
        });
      },
    });
  },
});

export const PlayerStatisticMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOnePlayerStatistic({ alias: "createOnePlayerStatistic" });
  },
});
