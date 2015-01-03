/**
 * Created by Ed on 12/3/14.
 */

define(['detector', 'save-states', 'extractors/nes/nestopia/original'],
    function (detector, saveStates, nestopiaOriginalExtractor) {
        'use strict';

        return {
            inject: function (detectorMock, nestopiaOriginalExtractorMock) {
                detector = detectorMock;
                nestopiaOriginalExtractor = nestopiaOriginalExtractorMock;
            },

            create: function (bytes) {
                var gameStats, saveState;

                saveState = detector.detect(bytes);

                if (saveState === saveStates.NES_NESTOPIA) {
                    gameStats = nestopiaOriginalExtractor.extract(bytes, saveState.TYPE);
                } else {
                    throw 'Unexpected save state type.';
                }

                return gameStats;
            }
        };
    });