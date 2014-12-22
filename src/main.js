/**
 * Created by Ed on 12/3/14.
 */

define(['team-stats'], function(teamStats) {
    return {
        create: function (bytes) {
            return teamStats.getFirstDowns(bytes);
        }
    }
});