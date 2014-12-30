/**
 * Created by Ed on 12/28/14.
 */

define(function () {
    'use strict';

    var DOUBTFUL, HEALTHY, PROBABLE, QUESTIONABLE;

    DOUBTFUL = "doubtful";
    HEALTHY = "healthy";
    PROBABLE = "probable";
    QUESTIONABLE = "questionable";

    function getValue(healthBinary) {
        var healthValue = "";

        switch (healthBinary) {
        case "00":
            healthValue = HEALTHY;
            break;
        case "01":
            healthValue = PROBABLE;
            break;
        case "10":
            healthValue = QUESTIONABLE;
            break;
        case "11":
            healthValue = DOUBTFUL;
            break;
        }

        return healthValue;
    }

    return {
        DOUBTFUL: DOUBTFUL,
        HEALTHY: HEALTHY,
        PROBABLE: PROBABLE,
        QUESTIONABLE: QUESTIONABLE,

        getValue: getValue
    };
});