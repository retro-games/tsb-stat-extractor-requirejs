/**
 * Created by Ed on 12/3/14.
 */

define(['definitions/game-stats', 'mappers/player-stats', 'mappers/team-stats'],
    function (GameStats, playerStats, teamStats) {
        'use strict';

        return {
            create: function (bytes) {
                var gameStats = new GameStats();

                teamStats.mapTeamStats(gameStats, bytes);
                playerStats.mapPlayerStats(gameStats, bytes);

                return gameStats;
            },

            inject: function (playerStatsMock, teamStatsMock) {
                playerStats = playerStatsMock;
                teamStats = teamStatsMock;
            }
        };
    });