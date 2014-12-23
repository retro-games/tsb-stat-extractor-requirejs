/**
 * Created by Ed on 12/21/14.
 */

define(['locations/nes/original'], function(location) {
    return {
        mapFirstDowns: function (gameStats, bytes) {
            gameStats.home.firstDowns = bytes[location.FIRST_DOWNS];
            gameStats.away.firstDowns = bytes[location.FIRST_DOWNS + 1];
        },

        mapScores: function (gameStats, bytes) {
            gameStats.home.score.firstQuarter = parseInt(bytes[location.SCORES].toString(16));
            gameStats.home.score.secondQuarter = parseInt(bytes[location.SCORES + 1].toString(16));
            gameStats.home.score.thirdQuarter = parseInt(bytes[location.SCORES + 2].toString(16));
            gameStats.home.score.fourthQuarter = parseInt(bytes[location.SCORES + 3].toString(16));
            gameStats.home.score.final = parseInt(bytes[location.SCORES + 4].toString(16));

            gameStats.away.score.firstQuarter = parseInt(bytes[location.SCORES + 5].toString(16));
            gameStats.away.score.secondQuarter = parseInt(bytes[location.SCORES + 6].toString(16));
            gameStats.away.score.thirdQuarter = parseInt(bytes[location.SCORES + 7].toString(16));
            gameStats.away.score.fourthQuarter = parseInt(bytes[location.SCORES + 8].toString(16));
            gameStats.away.score.final = parseInt(bytes[location.SCORES + 9].toString(16));
        }
    }
})