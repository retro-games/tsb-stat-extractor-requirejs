/**
 * Created by Ed on 12/22/14.
 */

define(function() {
    function Definition() {
        return {
            firstDowns: undefined,
            score: {
                firstQuarter: undefined,
                secondQuarter: undefined,
                thirdQuarter: undefined,
                fourthQuarter: undefined,
                final: undefined
            },
            teamId: undefined
        }
    }

    return Definition;
});