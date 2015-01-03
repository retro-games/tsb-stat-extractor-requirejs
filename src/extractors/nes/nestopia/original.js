/**
 * Created by Ed on 1/2/15.
 */

define(['definitions/game-stats', 'extractors/nes/player-stats', 'extractors/nes/team-stats'],
    function (GameStats, playerStats, teamStats) {
        'use strict';

        return {
            LOCATION: {
                FIRST_DOWNS: 6429,
                PLAYER_STATS_HOME: 5781,
                PLAYER_STATS_AWAY: 6042,
                SCORES: 973,
                TEAM_IDS: 164
            },

            extract: function (bytes, saveStateType) {
                var gameStats = new GameStats(saveStateType);
                teamStats.mapTeamStats(gameStats, bytes, this.LOCATION);
                playerStats.mapPlayerStats(gameStats, bytes, this.LOCATION);
                return gameStats;
            }
        };
    });