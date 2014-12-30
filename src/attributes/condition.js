/**
 * Created by Ed on 12/28/14.
 */

define(function () {
    'use strict';

    var AVERAGE, BAD, GOOD, EXCELLENT;

    AVERAGE = "average";
    BAD = "bad";
    EXCELLENT = "excellent";
    GOOD = "good";

    function getValue(conditionBinary) {
        var conditionValue = "";

        switch (conditionBinary) {
        case "00":
            conditionValue = BAD;
            break;
        case "01":
            conditionValue = AVERAGE;
            break;
        case "10":
            conditionValue = GOOD;
            break;
        case "11":
            conditionValue = EXCELLENT;
            break;
        }

        return conditionValue;
    }

    return {
        AVERAGE: AVERAGE,
        BAD: BAD,
        EXCELLENT: EXCELLENT,
        GOOD: GOOD,

        getValue: getValue
    };
});