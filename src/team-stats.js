/**
 * Created by Ed on 12/21/14.
 */

define(function() {
    return {
        getFirstDowns : function (bytes) {
            var homeFirstDowns = bytes[6429];
            var awayFirstDowns = bytes[6430];

            return {
                "home": {
                    "firstDowns": homeFirstDowns
                },
                "away": {
                    "firstDowns": awayFirstDowns
                }
            }
        }
    }
})