/**
 * Created by Ed on 12/21/14.
 */

define(['definitions/team-stats', 'locations/nes/nestopia/original'], function (TeamStats, location) {
    'use strict';

    function mapFirstDowns(gameStats, bytes) {
        var bytePosition = location.FIRST_DOWNS;

        gameStats.home.team.firstDowns = bytes[bytePosition++];
        gameStats.away.team.firstDowns = bytes[bytePosition];
    }

    function mapScores(gameStats, bytes) {
        var bytePosition = location.SCORES;

        gameStats.home.team.score.firstQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.home.team.score.secondQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.home.team.score.thirdQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.home.team.score.fourthQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.home.team.score.final = parseInt(bytes[bytePosition++].toString(16), 10);

        gameStats.away.team.score.firstQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.away.team.score.secondQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.away.team.score.thirdQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.away.team.score.fourthQuarter = parseInt(bytes[bytePosition++].toString(16), 10);
        gameStats.away.team.score.final = parseInt(bytes[bytePosition].toString(16), 10);
    }

    function mapTeamIds(gameStats, bytes) {
        var bytePosition = location.TEAM_IDS;

        gameStats.home.team.teamId = bytes[bytePosition++];
        gameStats.away.team.teamId = bytes[bytePosition];
    }

    return {
        mapTeamStats: function (gameStats, bytes) {
            gameStats.home.team = new TeamStats();
            gameStats.away.team = new TeamStats();

            mapFirstDowns(gameStats, bytes);
            mapScores(gameStats, bytes);
            mapTeamIds(gameStats, bytes);
        }
    };
});