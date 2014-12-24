/**
 * Created by Ed on 12/21/14.
 */

define(['locations/nes/original'], function(location) {
    return {
        mapFirstDowns: function (gameStats, bytes) {
            gameStats.home.game.firstDowns = bytes[location.FIRST_DOWNS];
            gameStats.away.game.firstDowns = bytes[location.FIRST_DOWNS + 1];
        },

        mapScores: function (gameStats, bytes) {
            gameStats.home.game.score.firstQuarter = parseInt(bytes[location.SCORES].toString(16));
            gameStats.home.game.score.secondQuarter = parseInt(bytes[location.SCORES + 1].toString(16));
            gameStats.home.game.score.thirdQuarter = parseInt(bytes[location.SCORES + 2].toString(16));
            gameStats.home.game.score.fourthQuarter = parseInt(bytes[location.SCORES + 3].toString(16));
            gameStats.home.game.score.final = parseInt(bytes[location.SCORES + 4].toString(16));

            gameStats.away.game.score.firstQuarter = parseInt(bytes[location.SCORES + 5].toString(16));
            gameStats.away.game.score.secondQuarter = parseInt(bytes[location.SCORES + 6].toString(16));
            gameStats.away.game.score.thirdQuarter = parseInt(bytes[location.SCORES + 7].toString(16));
            gameStats.away.game.score.fourthQuarter = parseInt(bytes[location.SCORES + 8].toString(16));
            gameStats.away.game.score.final = parseInt(bytes[location.SCORES + 9].toString(16));
        },

        mapTeamIds: function (gameStats, bytes) {
            gameStats.home.game.teamId = bytes[location.TEAM_IDS];
            gameStats.away.game.teamId = bytes[location.TEAM_IDS + 1];
        }
    }
})