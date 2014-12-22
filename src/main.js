/**
 * Created by Ed on 12/3/14.
 */

define(['team-stats'], function(teamStats) {
    function createGameStatsJson() {
        return {
            "home": {},
            "away": {}
        }
    }

    return {
        create: function (bytes) {
            var gameStats = createGameStatsJson();

            teamStats.getFirstDowns(gameStats, bytes);

            return gameStats;
        }
    }
});