/**
 * Created by Ed on 12/21/14.
 */

define(['definitions/team-stats', 'locations/nes/original'], function(TeamStats, location) {

    function mapFirstDowns(gameStats, bytes) {
        gameStats.home.team.firstDowns = bytes[location.FIRST_DOWNS];
        gameStats.away.team.firstDowns = bytes[location.FIRST_DOWNS + 1];
    }

    function mapScores(gameStats, bytes) {
        gameStats.home.team.score.firstQuarter = parseInt(bytes[location.SCORES].toString(16));
        gameStats.home.team.score.secondQuarter = parseInt(bytes[location.SCORES + 1].toString(16));
        gameStats.home.team.score.thirdQuarter = parseInt(bytes[location.SCORES + 2].toString(16));
        gameStats.home.team.score.fourthQuarter = parseInt(bytes[location.SCORES + 3].toString(16));
        gameStats.home.team.score.final = parseInt(bytes[location.SCORES + 4].toString(16));

        gameStats.away.team.score.firstQuarter = parseInt(bytes[location.SCORES + 5].toString(16));
        gameStats.away.team.score.secondQuarter = parseInt(bytes[location.SCORES + 6].toString(16));
        gameStats.away.team.score.thirdQuarter = parseInt(bytes[location.SCORES + 7].toString(16));
        gameStats.away.team.score.fourthQuarter = parseInt(bytes[location.SCORES + 8].toString(16));
        gameStats.away.team.score.final = parseInt(bytes[location.SCORES + 9].toString(16));
    }

    function mapTeamIds(gameStats, bytes) {
        gameStats.home.team.teamId = bytes[location.TEAM_IDS];
        gameStats.away.team.teamId = bytes[location.TEAM_IDS + 1];
    }

    return {
        mapTeamStats: function (gameStats, bytes) {
            gameStats.home.team = new TeamStats();
            gameStats.away.team = new TeamStats();

            mapFirstDowns(gameStats, bytes);
            mapScores(gameStats, bytes);
            mapTeamIds(gameStats, bytes);
        }
    }
})