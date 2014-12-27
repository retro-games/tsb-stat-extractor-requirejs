/**
 * Created by Ed on 12/3/14.
 */

define(['definitions/game-stats', 'mappers/team-stats'], function(GameStats, teamStats) {
    return {
        create: function (bytes) {
            var gameStats = new GameStats();

            teamStats.mapTeamStats(gameStats, bytes);

            return gameStats;
        }
    }
});