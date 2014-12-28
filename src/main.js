/**
 * Created by Ed on 12/3/14.
 */

define(['definitions/game-stats', 'mappers/team-stats', 'mappers/player-stats'],
    function(GameStats, teamStats, playerStats) {
        return {
            create: function (bytes) {
                var gameStats = new GameStats();

                teamStats.mapTeamStats(gameStats, bytes);
                playerStats.mapPlayerStats(gameStats, bytes);

                return gameStats;
            }
        }
    });