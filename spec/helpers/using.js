/**
 * Created by Ed on 12/20/14.
 */

define('helpers/using', function () {
    'use strict';

    /*jslint unparam: true*/
    function using(name, values, func) {
        var i;

        for (i = 0; i < values.length; i++) {
            if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
                values[i] = [values[i]];
            }
            /*jshint validthis: true */
            func.apply(this, values[i]);
        }
    }
    /*jslint unparam: false*/

    return using;
});