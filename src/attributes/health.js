/**
 * Created by Ed on 12/28/14.
 */

define(function () {
    'use strict';

    return {
        DOUBTFUL: 'doubtful',
        HEALTHY: 'healthy',
        PROBABLE: 'probable',
        QUESTIONABLE: 'questionable',

        getValue: function (healthBinary) {
            var healthValue = "";

            switch (healthBinary) {
            case '00':
                healthValue = this.HEALTHY;
                break;
            case '01':
                healthValue = this.PROBABLE;
                break;
            case '10':
                healthValue = this.QUESTIONABLE;
                break;
            case '11':
                healthValue = this.DOUBTFUL;
                break;
            }

            return healthValue;
        }
    };
});