/**
 * Created by Ed on 12/27/14.
 */

define(['definitions/players/qb-stats', 'definitions/players/qb-stats', 'locations/nes/nestopia/original'],
    function(QBStats, OffPlayerStats, location) {

    function mapQBStats(playerStats, bytePosition, bytes) {
        var qbStats;

        for (var i = 0; i < 2; i++) {
            qbStats = new QBStats();
            qbStats.passAttempts = bytes[bytePosition++];
            qbStats.passCompletions = bytes[bytePosition++];
            qbStats.passTouchdowns = bytes[bytePosition++];
            qbStats.passInterceptions = bytes[bytePosition++];
            qbStats.passYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);
            qbStats.rushAttempts = bytes[bytePosition++];
            qbStats.rushYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);
            qbStats.rushTouchdowns = bytes[bytePosition++];
            playerStats.push(qbStats);
        }

        return bytePosition;
    }

    function mapOffPlayerStats(playerStats, bytePosition, bytes) {
        var offPlayerStats;

        for (var i = 0; i < 10; i++) {
            offPlayerStats = new OffPlayerStats();
            offPlayerStats.receptions = bytes[bytePosition++];
            offPlayerStats.recYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);
            offPlayerStats.recTouchdowns = bytes[bytePosition++];
            offPlayerStats.kickReturns = bytes[bytePosition++];
            offPlayerStats.kickReturnYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);
            offPlayerStats.kickReturnTouchdowns = bytes[bytePosition++];
            offPlayerStats.puntReturns = bytes[bytePosition++];
            offPlayerStats.puntReturnYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);
            offPlayerStats.puntReturnTouchdowns = bytes[bytePosition++];
            offPlayerStats.rushAttempts = bytes[bytePosition++];
            offPlayerStats.rushYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);
            offPlayerStats.rushTouchdowns = bytes[bytePosition++];
            playerStats.push(offPlayerStats);
        }

        return bytePosition;
    }

    function getYards(remainder, multiplier) {
        var totalYards;

        if (multiplier < 10) {
            totalYards = remainder + (multiplier * 256);
        } else {
            totalYards = (new Int16Array(-(256 - remainder)) - ((255 - multiplier) * 256))[0];
        }

        return totalYards;
    }

    return {
        mapPlayerStats: function (gameStats, bytes) {
            var bytePosition = location.PLAYER_STATS;

            bytePosition = mapQBStats(gameStats.home.player, bytePosition, bytes);
            bytePosition = mapOffPlayerStats(gameStats.home.player, bytePosition, bytes);
        }
    }
})