/**
 * Created by Ed on 12/28/14.
 */

define(['main', 'mappers/player-stats', 'mappers/team-stats'], function(m, playerStats, teamStats) {
    var bytes;

    bytes = [];

    m.inject(playerStats, teamStats);

    describe('main', function () {
        describe('create', function () {
            beforeEach(function () {
                spyOn(playerStats, 'mapPlayerStats').and.callFake(function () { return undefined; });
                spyOn(teamStats, 'mapTeamStats').and.callFake(function () { return undefined; });
            });

            it('should request mapPlayerStats from playerStats', function () {
                m.create(bytes);
                expect(playerStats.mapPlayerStats).toHaveBeenCalled();
            });

            it('should request mapTeamStats from teamStats', function () {
                m.create(bytes);
                expect(teamStats.mapTeamStats).toHaveBeenCalled();
            })
        })
    })
});