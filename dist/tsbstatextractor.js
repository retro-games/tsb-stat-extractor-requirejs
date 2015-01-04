/**
 * Created by Ed on 1/2/15.
 */

define('save-states',[],function () {
    

    return {
        NES_NESTOPIA: {
            LENGTH: 13165,
            TYPE: 'NES - Nestopia',
            UID: 'something'
        },
        UNKNOWN: {
            TYPE: 'Unknown'
        }
    };
});
/**
 * Created by Ed on 1/2/15.
 */

define('detector',['save-states'], function (saveStates) {
    

    return {
        detect: function (bytes) {
            var saveState = saveStates.UNKNOWN;

            if (bytes.length === saveStates.NES_NESTOPIA.LENGTH) {
                saveState = saveStates.NES_NESTOPIA;
            }

            return saveState;
        }
    };
});
/**
 * Created by Ed on 12/26/14.
 */

define('definitions/game-stats',[],function () {
    

    function Definition(type) {
        return {
            saveStateType: type,
            home: {
                team: undefined,
                player: []
            },
            away: {
                team: undefined,
                player: []
            }
        };
    }

    return Definition;
});
/**
 * Created by Ed on 12/28/14.
 */

define('attributes/condition',[],function () {
    

    return {
        AVERAGE: 'average',
        BAD: 'bad',
        EXCELLENT: 'excellent',
        GOOD: 'good',

        getValue: function (conditionBinary) {
            var conditionValue = "";

            switch (conditionBinary) {
            case '00':
                conditionValue = this.BAD;
                break;
            case '01':
                conditionValue = this.AVERAGE;
                break;
            case '10':
                conditionValue = this.GOOD;
                break;
            case '11':
                conditionValue = this.EXCELLENT;
                break;
            }

            return conditionValue;
        }
    };
});
/**
 * Created by Ed on 12/28/14.
 */

define('attributes/health',[],function () {
    

    return {
        DOUBTFUL: 'doubtful',
        HEALTHY: 'healthy',
        PROBABLE: 'probable',
        QUESTIONABLE: 'questionable',

        getValue: function (healthBinary) {
            var healthValue = "";

            switch (healthBinary) {
            case '00':
                healthValue = this.HEALTHY;
                break;
            case '01':
                healthValue = this.PROBABLE;
                break;
            case '10':
                healthValue = this.QUESTIONABLE;
                break;
            case '11':
                healthValue = this.DOUBTFUL;
                break;
            }

            return healthValue;
        }
    };
});
/**
 * Created by Ed on 12/26/14.
 */

define('definitions/players/qb-stats',[],function () {
    

    function Definition() {
        return {
            condition: undefined,
            health: undefined,
            passAttempts: undefined,
            passCompletions: undefined,
            passYards: undefined,
            passTouchdowns: undefined,
            passInterceptions: undefined,
            rushAttempts: undefined,
            rushYards: undefined,
            rushTouchdowns: undefined
        };
    }

    return Definition;
});
/**
 * Created by Ed on 12/27/14.
 */

define('definitions/players/off-player-stats',[],function () {
    

    function Definition() {

        return {
            condition: undefined,
            health: undefined,
            rushAttempts: undefined,
            rushYards: undefined,
            rushTouchdowns: undefined,
            receptions: undefined,
            recYards: undefined,
            recTouchdowns: undefined,
            kickReturns: undefined,
            kickReturnYards: undefined,
            kickReturnTouchdowns: undefined,
            puntReturns: undefined,
            puntReturnYards: undefined,
            puntReturnTouchdowns: undefined
        };
    }

    return Definition;
});
/**
 * Created by Ed on 12/28/14.
 */

define('definitions/players/def-player-stats',[],function () {
    

    function Definition() {

        return {
            condition: undefined,
            sacks: undefined,
            interceptions: undefined,
            intYards: undefined,
            intTouchdowns: undefined
        };
    }

    return Definition;
});
/**
 * Created by Ed on 12/28/14.
 */

define('definitions/players/kick-stats',[],function () {
    

    function Definition() {

        return {
            condition: undefined,
            fieldGoalAttempts: undefined,
            fieldGoalsMade: undefined,
            extraPointAttempts: undefined,
            extraPointsMade: undefined
        };
    }

    return Definition;
});
/**
 * Created by Ed on 12/28/14.
 */

define('definitions/players/punt-stats',[],function () {
    

    function Definition() {

        return {
            condition: undefined,
            punts: undefined,
            puntYards: undefined
        };
    }

    return Definition;
});
/**
 * Created by Ed on 12/27/14.
 */

define('extractors/nes/player-stats',['attributes/condition', 'attributes/health', 'definitions/players/qb-stats',
        'definitions/players/off-player-stats', 'definitions/players/def-player-stats',
        'definitions/players/kick-stats', 'definitions/players/punt-stats'],
    function (condition, health, QBStats, OffPlayerStats, DefPlayerStats, KickStats, PuntStats) {
        

        function getYards(remainder, multiplier) {
            var negativeMultiplier, negativeRemainder, totalYards;

            if (multiplier < 10) {
                totalYards = remainder + (multiplier * 256);
            } else {
                negativeRemainder = Math.abs(256 - remainder) * -1;
                negativeMultiplier = Math.abs((255 - multiplier) * 256) * -1;
                totalYards = negativeRemainder + negativeMultiplier;
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
            mapPlayerStats: function (gameStats, bytes, location) {
                mapPlayerStats(gameStats.home.player, location.PLAYER_STATS_HOME, bytes);
                mapPlayerStats(gameStats.away.player, location.PLAYER_STATS_AWAY, bytes);
            }
        };
    });
/**
 * Created by Ed on 12/22/14.
 */

define('definitions/team-stats',[],function () {
    

    function Definition() {
        return {
            firstDowns: undefined,
            score: {
                firstQuarter: undefined,
                secondQuarter: undefined,
                thirdQuarter: undefined,
                fourthQuarter: undefined,
                final: undefined
            },
            teamId: undefined
        };
    }

    return Definition;
});
/**
 * Created by Ed on 12/21/14.
 */

define('extractors/nes/team-stats',['definitions/team-stats'], function (TeamStats) {
    

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
/**
 * Created by Ed on 1/2/15.
 */

define('extractors/nes/nestopia/original',['definitions/game-stats', 'extractors/nes/player-stats', 'extractors/nes/team-stats'],
    function (GameStats, playerStats, teamStats) {
        

        return {
            LOCATION: {
                FIRST_DOWNS: 6429,
                PLAYER_STATS_HOME: 5781,
                PLAYER_STATS_AWAY: 6042,
                SCORES: 973,
                TEAM_IDS: 164
            },

            inject: function (GameStatsMock, playerStatsMock, teamStatsMock) {
                GameStats = GameStatsMock;
                playerStats = playerStatsMock;
                teamStats = teamStatsMock;
            },

            extract: function (bytes, saveStateType) {
                var gameStats = new GameStats(saveStateType);
                teamStats.mapTeamStats(gameStats, bytes, this.LOCATION);
                playerStats.mapPlayerStats(gameStats, bytes, this.LOCATION);
                return gameStats;
            }
        };
    });
/**
 * Created by Ed on 12/3/14.
 */

define('main',['detector', 'save-states', 'extractors/nes/nestopia/original'],
    function (detector, saveStates, nestopiaOriginalExtractor) {
        

        return {
            inject: function (detectorMock, nestopiaOriginalExtractorMock) {
                detector = detectorMock;
                nestopiaOriginalExtractor = nestopiaOriginalExtractorMock;
            },

            create: function (bytes) {
                var gameStats, saveState;

                saveState = detector.detect(bytes);

                if (saveState === saveStates.NES_NESTOPIA) {
                    gameStats = nestopiaOriginalExtractor.extract(bytes, saveState.TYPE);
                } else {
                    throw 'Unexpected save state type.';
                }

                return gameStats;
            }
        };
    });
/**
 * Created by Ed on 12/5/14.
 */

define(['main'], function (main) {
    

    return main;
});