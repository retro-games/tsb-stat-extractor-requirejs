/**
 * Created by Ed on 12/27/14.
 */

define(function () {
    'use strict';

    function Definition() {

        return {
            condition: undefined,
            health: undefined,
            rushAttempts: undefined,
            rushYards: undefined,
            rushTouchdowns: undefined,
            receptions: undefined,
            recYards: undefined,
            recTouchdowns: undefined,
            kickReturns: undefined,
            kickReturnYards: undefined,
            kickReturnTouchdowns: undefined,
            puntReturns: undefined,
            puntReturnYards: undefined,
            puntReturnTouchdowns: undefined
        };
    }

    return Definition;
});