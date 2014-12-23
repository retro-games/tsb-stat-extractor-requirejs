/**
 * Created by Ed on 12/4/14.
 */

define(['team-stats', 'definition', 'helpers/decode', 'helpers/using'], function(m, Definition, decode, using) {
    var gameData, gameStats, jsonData, saveState, saveStateString;

    gameData = new Definition();
    jsonData = fixture.load('state.json', 'stats.json');
    gameStats = jsonData[1];
    saveState = decode(jsonData[0].binary);

    describe('team stats', function () {
        describe('first downs', function () {
            beforeEach(function () {
                m.mapFirstDowns(gameData, saveState);
            });

            using('home team values', ['firstDowns'], function (value) {
                it('should return correct values', function () {
                    expect(gameStats.home[value]).toEqual(gameData.home[value]);
                })
            });

            using('away team values', ['firstDowns'], function (value) {
                it('should return correct values', function () {
                    expect(gameStats.away[value]).toEqual(gameData.away[value]);
                })
            });
        });

        describe('scores', function () {
            beforeEach(function () {
                m.mapScores(gameData, saveState);
            });

            console.log(gameData);

            using('home team values', ['firstQuarter', 'secondQuarter', 'thirdQuarter',
                'fourthQuarter', 'final'], function (value) {
                it('should return correct values', function () {
                    expect(gameStats.home.score[value]).toEqual(gameData.home.score[value]);
                })
            });

            using('away team values', ['firstQuarter', 'secondQuarter', 'thirdQuarter',
                'fourthQuarter', 'final'], function (value) {
                it('should return correct values', function () {
                    expect(gameStats.away.score[value]).toEqual(gameData.away.score[value]);
                })
            });
        })
    });
});
