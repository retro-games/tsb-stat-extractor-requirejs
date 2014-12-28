/**
 * Created by Ed on 12/27/14.
 */

define(['mappers/player-stats', 'definitions/game-stats', 'helpers/decode', 'helpers/using'],
    function(m, GameStats, decode, using) {
        var gameData, gameStats, jsonData, saveState;

        gameData = new GameStats();
        jsonData = fixture.load('state.json', 'player-stats.json');
        gameStats = jsonData[1];
        saveState = decode(jsonData[0].binary);

        m.mapPlayerStats(gameData, saveState);

        describe('player stats', function () {
            describe('QB stats', function () {
                using('home team values', ['passAttempts', 'passCompletions', 'passYards', 'passTouchdowns',
                    'passInterceptions', 'rushAttempts', 'rushYards', 'rushTouchdowns'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 0; i < 2; i++) {
                            expect(gameStats.home.player[i][value]).toEqual(gameData.home.player[i][value]);
                        }
                    })
                });

                using('away team values', ['passAttempts', 'passCompletions', 'passYards', 'passTouchdowns',
                    'passInterceptions', 'rushAttempts', 'rushYards', 'rushTouchdowns'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 0; i < 2; i++) {
                            expect(gameStats.away.player[i][value]).toEqual(gameData.away.player[i][value]);
                        }
                    })
                });
            });

            describe('offensive player stats', function () {
                using('home team values', ['rushAttempts', 'rushYards', 'rushTouchdowns', 'receptions',
                    'recYards', 'recTouchdowns', 'kickReturns', 'kickReturnYards', 'kickReturnTouchdowns',
                    'puntReturns', 'puntReturnYards', 'puntReturnTouchdowns'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 2; i < 12; i++) {
                            expect(gameStats.home.player[i][value]).toEqual(gameData.home.player[i][value]);
                        }
                    })
                });

                using('away team values', ['rushAttempts', 'rushYards', 'rushTouchdowns', 'receptions',
                    'recYards', 'recTouchdowns', 'kickReturns', 'kickReturnYards', 'kickReturnTouchdowns',
                    'puntReturns', 'puntReturnYards', 'puntReturnTouchdowns'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 2; i < 12; i++) {
                            expect(gameStats.away.player[i][value]).toEqual(gameData.away.player[i][value]);
                        }
                    })
                });
            });

            describe('defensive player stats', function () {
                using('home team values', ['sacks', 'interceptions', 'intYards', 'intTouchdowns'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 12; i < 23; i++) {
                            expect(gameStats.home.player[i][value]).toEqual(gameData.home.player[i][value]);
                        }
                    })
                });

                using('away team values', ['sacks', 'interceptions', 'intYards', 'intTouchdowns'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 12; i < 23; i++) {
                            expect(gameStats.away.player[i][value]).toEqual(gameData.away.player[i][value]);
                        }
                    })
                });
            });

            describe('kicker stats', function () {
                using('home team values', ['fieldGoalAttempts', 'fieldGoalsMade', 'extraPointAttempts',
                    'extraPointsMade'], function (value) {
                    it('should return correct values', function () {
                        expect(gameStats.home.player[23][value]).toEqual(gameData.home.player[23][value]);
                    })
                });

                using('away team values', ['fieldGoalAttempts', 'fieldGoalsMade', 'extraPointAttempts',
                    'extraPointsMade'], function (value) {
                    it('should return correct values', function () {
                        expect(gameStats.away.player[23][value]).toEqual(gameData.away.player[23][value]);
                    })
                });
            });

            describe('punter stats', function () {
                using('home team values', ['punts', 'puntYards'], function (value) {
                    it('should return correct values', function () {
                        expect(gameStats.home.player[24][value]).toEqual(gameData.home.player[24][value]);
                    })
                });

                using('away team values', ['punts', 'puntYards'], function (value) {
                    it('should return correct values', function () {
                        expect(gameStats.away.player[24][value]).toEqual(gameData.away.player[24][value]);
                    })
                });
            });

            describe('health stats', function () {
                using('home team values', ['health'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 0; i < 12; i++) {
                            expect(gameStats.home.player[i][value]).toEqual(gameData.home.player[i][value]);
                        }
                    })
                });

                using('away team values', ['health'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 0; i < 12; i++) {
                            expect(gameStats.away.player[i][value]).toEqual(gameData.away.player[i][value]);
                        }
                    })
                });
            });

            describe('conditions stats', function () {
                using('home team values', ['condition'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 0; i < 25; i++) {
                            expect(gameStats.home.player[i][value]).toEqual(gameData.home.player[i][value]);
                        }
                    })
                });

                using('away team values', ['condition'], function (value) {
                    it('should return correct values', function () {
                        for (var i = 0; i < 25; i++) {
                            expect(gameStats.away.player[i][value]).toEqual(gameData.away.player[i][value]);
                        }
                    })
                });
            });
        });
    });