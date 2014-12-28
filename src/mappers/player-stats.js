/**
 * Created by Ed on 12/27/14.
 */

define(['definitions/players/qb-stats', 'definitions/players/off-player-stats', 'definitions/players/def-player-stats',
        'definitions/players/kick-stats', 'definitions/players/punt-stats', 'locations/nes/nestopia/original'],
    function(QBStats, OffPlayerStats, DefPlayerStats, KickStats, PuntStats, location) {

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

        function mapDefPlayerStats(playerStats, bytePosition, bytes) {
            var defPlayerStats;

            for (var i = 0; i < 11; i++) {
                defPlayerStats = new DefPlayerStats();
                defPlayerStats.sacks = bytes[bytePosition++];
                defPlayerStats.interceptions = bytes[bytePosition++];
                defPlayerStats.intYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);
                defPlayerStats.intTouchdowns = bytes[bytePosition++];
                playerStats.push(defPlayerStats);
            }

            return bytePosition;
        }

        function mapKickStats(playerStats, bytePosition, bytes) {
            var kickStats = new KickStats();

            kickStats.fieldGoalAttempts = bytes[bytePosition++];
            kickStats.fieldGoalsMade = bytes[bytePosition++];
            kickStats.extraPointAttempts = bytes[bytePosition++];
            kickStats.extraPointsMade = bytes[bytePosition++];
            playerStats.push(kickStats);

            return bytePosition;
        }

        function mapPuntStats(playerStats, bytePosition, bytes) {
            var puntStats = new PuntStats();

            puntStats.punts = bytes[bytePosition++];
            puntStats.puntYards = getYards(bytes[bytePosition++], bytes[bytePosition++]);

            playerStats.push(puntStats);

            return bytePosition;
        }

        function mapPlayerStats(playerStats, bytePosition, bytes) {
            bytePosition = mapQBStats(playerStats, bytePosition, bytes);
            bytePosition = mapOffPlayerStats(playerStats, bytePosition, bytes);
            bytePosition = mapDefPlayerStats(playerStats, bytePosition, bytes);
            bytePosition = mapKickStats(playerStats, bytePosition, bytes);
            bytePosition = mapPuntStats(playerStats, bytePosition, bytes);

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

                bytePosition = mapPlayerStats(gameStats.home.player, bytePosition, bytes);
            }
        }
    })