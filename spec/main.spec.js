/**
 * Created by Ed on 12/4/14.
 */

define(['tsbex/main'], function(m) {
    var jsonData, jsonFixture;

    jsonData = fixture.load('stats.json');

    describe('test', function() {
        it("should have a score", function () {
            expect(jsonData.home.score).toEqual(10);
        });
    });
});
