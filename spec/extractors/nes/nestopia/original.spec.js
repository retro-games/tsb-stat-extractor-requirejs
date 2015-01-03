/**
 * Created by Ed on 1/2/15.
 */

define(['extractors/nes/nestopia/original', 'save-states', 'definitions/game-stats', 'extractors/nes/player-stats',
        'extractors/nes/team-stats'],
    function (m, saveStates, GameStatsMock, playerStatsMock, teamStatsMock) {
        'use strict';

        var bytes, result;

        bytes = [];

        m.inject(GameStatsMock, playerStatsMock, teamStatsMock);

        describe('NES Nestopia Original', function () {
            describe('extract', function () {
                beforeEach(function () {
                    spyOn(playerStatsMock, 'mapPlayerStats').and.callFake(function () { return undefined; });
                    spyOn(teamStatsMock, 'mapTeamStats').and.callFake(function () { return undefined; });
                });

                it('should return save state type in game stats result', function () {
                    result = m.extract(bytes, saveStates.NES_NESTOPIA.TYPE);
                    expect(result.saveStateType).toBe(saveStates.NES_NESTOPIA.TYPE);
                });

                it('should request mapPlayerStats from playerStats', function () {
                    m.extract(bytes, saveStates.NES_NESTOPIA.TYPE);
                    expect(playerStatsMock.mapPlayerStats).toHaveBeenCalled();
                });

                it('should request mapTeamStats from teamStats', function () {
                    m.extract(bytes, saveStates.NES_NESTOPIA.TYPE);
                    expect(teamStatsMock.mapTeamStats).toHaveBeenCalled();
                });
            });
        });
    });