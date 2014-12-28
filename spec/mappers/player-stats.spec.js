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
                        expect(gameStats.home.player[0][value]).toEqual(gameData.home.player[0][value]);
                        expect(gameStats.home.player[1][value]).toEqual(gameData.home.player[1][value]);
                    })
                });
            });
        });
    });