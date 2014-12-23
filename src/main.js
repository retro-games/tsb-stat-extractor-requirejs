/**
 * Created by Ed on 12/3/14.
 */

define(['definition', 'team-stats'], function(Definition, teamStats) {
    return {
        create: function (bytes) {
            var gameStats = new Definition();

            teamStats.mapFirstDowns(gameStats, bytes);
            teamStats.mapScores(gameStats, bytes);

            return gameStats;
        }
    }
});