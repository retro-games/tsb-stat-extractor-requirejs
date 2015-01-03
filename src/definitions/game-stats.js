/**
 * Created by Ed on 12/26/14.
 */

define(function () {
    'use strict';

    function Definition(type) {
        return {
            saveStateType: type,
            home: {
                team: undefined,
                player: []
            },
            away: {
                team: undefined,
                player: []
            }
        };
    }

    return Definition;
});