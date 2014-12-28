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
            });
        });
    });