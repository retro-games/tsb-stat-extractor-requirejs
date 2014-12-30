/**
 * Created by Ed on 12/27/14.
 */

define(['attributes/condition', 'attributes/health', 'definitions/players/qb-stats',
        'definitions/players/off-player-stats', 'definitions/players/def-player-stats',
        'definitions/players/kick-stats', 'definitions/players/punt-stats', 'locations/nes/nestopia/original'],
    function (condition, health, QBStats, OffPlayerStats, DefPlayerStats, KickStats, PuntStats, location) {
        'use strict';

        function getYards(remainder, multiplier) {
            var totalYards;

            if (multiplier < 10) {
                totalYards = remainder + (multiplier * 256);
            } else {
                totalYards = (new Int16Array(-(256 - remainder)) - ((255 - multiplier) * 256))[0];
            }

            return totalYards;
        }

        function mapQBStats(playerStats, bytePosition, bytes) {
            var i, qbStats;

            for (i = 0; i < 2; i++) {
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
            var i, offPlayerStats;

            for (i = 0; i < 10; i++) {
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
            var i, defPlayerStats;

            for (i = 0; i < 11; i++) {
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

        function mapHealth(playerStats, bytePosition, bytes) {
            var binaryHealth, end, i, j, k, playersHealth, start;

            playersHealth = "";

            for (i = 0; i < 3; i++) {
                binaryHealth = bytes[bytePosition++].toString(2);
                for (j = binaryHealth.length; j < 8; j++) {
                    binaryHealth = "0" + binaryHealth;
                }
                playersHealth += binaryHealth;
            }

            for (k = 0; k < 12; k++) {
                start = k * 2;
                end = start + 2;
                playerStats[k].health = health.getValue(playersHealth.substring(start, end));
            }

            return bytePosition;
        }

        function mapCondition(playerStats, bytePosition, bytes) {
            var binaryCondition, end, i, j, k, playersCondition, start;

            playersCondition = "";

            for (i = 0; i < 8; i++) {
                binaryCondition = bytes[bytePosition++].toString(2);
                for (j = binaryCondition.length; j < 8; j++) {
                    binaryCondition = "0" + binaryCondition;
                }
                playersCondition += binaryCondition;
            }

            for (k = 0; k < 25; k++) {
                start = k * 2;
                end = start + 2;
                playerStats[k].condition = condition.getValue(playersCondition.substring(start, end));
            }
        }

        function mapPlayerStats(playerStats, bytePosition, bytes) {
            bytePosition = mapQBStats(playerStats, bytePosition, bytes);
            bytePosition = mapOffPlayerStats(playerStats, bytePosition, bytes);
            bytePosition = mapDefPlayerStats(playerStats, bytePosition, bytes);
            bytePosition = mapKickStats(playerStats, bytePosition, bytes);
            bytePosition = mapPuntStats(playerStats, bytePosition, bytes);

            // skip 8 bytes for health / conditions
            bytePosition += 8;

            bytePosition = mapHealth(playerStats, bytePosition, bytes);
            mapCondition(playerStats, bytePosition, bytes);
        }

        return {
            mapPlayerStats: function (gameStats, bytes) {
                mapPlayerStats(gameStats.home.player, location.PLAYER_STATS_HOME, bytes);
                mapPlayerStats(gameStats.away.player, location.PLAYER_STATS_AWAY, bytes);
            }
        };
    });