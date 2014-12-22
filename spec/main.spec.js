/**
 * Created by Ed on 12/4/14.
 */

define(['main', 'helpers/decode', 'helpers/using'], function(m, decode, using) {
    var gameData, gameStats, jsonData, saveState, saveStateString;

    jsonData = fixture.load('state.json', 'stats.json');
    gameStats = jsonData[1];
    saveState = decode(jsonData[0].binary);
    gameData = m.create(saveState);

    describe('game stats', function() {
        using('home game values', ['firstDowns'], function(value){
            it('should return correct values', function() {
                expect(gameStats.home[value]).toEqual(gameData.home[value]);
            })
        });

        using('away game values', ['firstDowns'], function(value){
            it('should return correct values', function() {
                expect(gameStats.away[value]).toEqual(gameData.away[value]);
            })
        });
    });
});
