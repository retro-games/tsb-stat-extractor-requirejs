/**
 * Created by Ed on 1/2/15.
 */

define(['save-states'], function (saveStates) {
    'use strict';

    return {
        detect: function (bytes) {
            var saveState = saveStates.UNKNOWN;

            if (bytes.length === saveStates.NES_NESTOPIA.LENGTH) {
                saveState = saveStates.NES_NESTOPIA;
            }

            return saveState;
        }
    };
});