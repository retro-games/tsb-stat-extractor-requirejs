/**
 * Created by Ed on 1/2/15.
 */

define(['detector', 'save-states'], function (m, saveStates) {
    'use strict';

    var bytes, saveState;

    describe('detector', function () {
        describe('detect', function () {
            it('should return NES Nestopia save state type if said type', function () {
                bytes = new Array(saveStates.NES_NESTOPIA.LENGTH);
                saveState = m.detect(bytes);
                expect(saveState).toBe(saveStates.NES_NESTOPIA);
            });

            it('should return unknown save state type if type is not found', function () {
                bytes = [];
                saveState = m.detect(bytes);
                expect(saveState).toBe(saveStates.UNKNOWN);
            });
        });
    });
});