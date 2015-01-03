/**
 * Created by Ed on 12/21/14.
 */

define(['definitions/team-stats'], function (TeamStats) {
    'use strict';

    function mapFirstDowns(gameStats, bytes, location) {
        var bytePosition = location.FIRST_DOWNS;

        gameStats.home.team.firstDowns = bytes[bytePosition++];
        gameStats.away.team.firstDowns = bytes[bytePosition];
    }

    function mapScores(gameStats, bytes, location) {
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

    function mapTeamIds(gameStats, bytes, location) {
        var bytePosition = location.TEAM_IDS;

        gameStats.home.team.teamId = bytes[bytePosition++];
        gameStats.away.team.teamId = bytes[bytePosition];
    }

    return {
        mapTeamStats: function (gameStats, bytes, location) {
            gameStats.home.team = new TeamStats();
            gameStats.away.team = new TeamStats();

            mapFirstDowns(gameStats, bytes, location);
            mapScores(gameStats, bytes, location);
            mapTeamIds(gameStats, bytes, location);
        }
    };
});