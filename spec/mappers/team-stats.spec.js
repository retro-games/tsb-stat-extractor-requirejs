/**
 * Created by Ed on 12/4/14.
 */

define(['mappers/team-stats', 'definitions/game-stats', 'helpers/decode', 'helpers/using'],
    function (m, GameStats, decode, using) {
        'use strict';

        var fixtures, gameData, gameStats, jsonData, saveState;

        fixtures = [['game_one/state.json', 'game_one/team-stats.json'],
            ['game_one/state.json', 'game_one/team-stats.json']];

        fixtures.forEach(function (gameSet) {
            gameData = new GameStats();
            jsonData = fixture.load(gameSet[0], gameSet[1]);
            gameStats = jsonData[1];
            saveState = decode(jsonData[0].binary);

            m.mapTeamStats(gameData, saveState);

            describe('team stats', function () {
                describe('first downs', function () {
                    using('home team values', ['firstDowns'], function (value) {
                        it('should return correct values', function () {
                            expect(gameStats.home.team[value]).toEqual(gameData.home.team[value]);
                        });
                    });

                    using('away team values', ['firstDowns'], function (value) {
                        it('should return correct values', function () {
                            expect(gameStats.away.team[value]).toEqual(gameData.away.team[value]);
                        });
                    });
                });

                describe('scores', function () {
                    using('home team values', ['firstQuarter', 'secondQuarter', 'thirdQuarter',
                        'fourthQuarter', 'final'], function (value) {
                        it('should return correct values', function () {
                            expect(gameStats.home.team.score[value]).toEqual(gameData.home.team.score[value]);
                        });
                    });

                    using('away team values', ['firstQuarter', 'secondQuarter', 'thirdQuarter',
                        'fourthQuarter', 'final'], function (value) {
                        it('should return correct values', function () {
                            expect(gameStats.away.team.score[value]).toEqual(gameData.away.team.score[value]);
                        });
                    });
                });

                describe('team ids', function () {
                    using('home team values', ['teamId'], function (value) {
                        it('should return correct values', function () {
                            expect(gameStats.home.team[value]).toEqual(gameData.home.team[value]);
                        });
                    });

                    using('away team values', ['teamId'], function (value) {
                        it('should return correct values', function () {
                            expect(gameStats.away.team[value]).toEqual(gameData.away.team[value]);
                        });
                    });
                });
            });
        });
    });
