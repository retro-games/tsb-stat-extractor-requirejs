/**
 * Created by Ed on 12/28/14.
 */

define(function () {

    var EXCELLENT = "excellent";
    var GOOD = "good";
    var AVERAGE = "average";
    var BAD = "bad";

    function getValue(conditionBinary) {
        var conditionValue = "";

        switch (conditionBinary) {
            case "00":
                conditionValue = EXCELLENT;
                break;
            case "01":
                conditionValue = GOOD;
                break;
            case "10":
                conditionValue = AVERAGE;
                break;
            case "11":
                conditionValue = BAD;
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