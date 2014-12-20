/**
 * Created by Ed on 12/4/14.
 */

define(['main', 'using'], function(m, using) {
    var gameData, jsonData;

    gameData = {
        "home": {
            "score": 10,
            "firstDowns": 5
        },
        "away": {
            "score": 14,
            "firstDowns": 2
        }
    };

    jsonData = fixture.load('stats.json');

    describe('game stats', function() {
        using('home game values', ['score', 'firstDowns'], function(value){
            it('should return correct values', function() {
                expect(jsonData.home[value]).toEqual(gameData.home[value]);
            })
        });
    });
});
