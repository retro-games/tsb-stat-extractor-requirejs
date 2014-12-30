/**
 * Created by Ed on 12/26/14.
 */

define(function () {
    'use strict';

    function Definition() {
        return {
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