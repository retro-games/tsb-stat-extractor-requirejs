/**
 * Created by Ed on 12/28/14.
 */

define(function () {
    'use strict';

    return {
        AVERAGE: 'average',
        BAD: 'bad',
        EXCELLENT: 'excellent',
        GOOD: 'good',

        getValue: function (conditionBinary) {
            var conditionValue = "";

            switch (conditionBinary) {
            case '00':
                conditionValue = this.BAD;
                break;
            case '01':
                conditionValue = this.AVERAGE;
                break;
            case '10':
                conditionValue = this.GOOD;
                break;
            case '11':
                conditionValue = this.EXCELLENT;
                break;
            }

            return conditionValue;
        }
    };
});