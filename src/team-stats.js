/**
 * Created by Ed on 12/21/14.
 */

define(['locations/nes/original'], function(location) {
    return {
        getFirstDowns : function (gameStats, bytes) {
            gameStats.home.firstDowns = bytes[location.FIRST_DOWNS];
            gameStats.away.firstDowns = bytes[location.FIRST_DOWNS + 1];
        }
    }
})