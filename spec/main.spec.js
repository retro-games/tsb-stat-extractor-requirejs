/**
 * Created by Ed on 12/28/14.
 */

define(['main', 'detector', 'save-states', 'extractors/nes/nestopia/original'],
    function (m, detectorMock, saveStates, nestopiaOriginalExtractorMock) {
        'use strict';

        var bytes = [];

        m.inject(detectorMock, nestopiaOriginalExtractorMock);

        describe('main', function () {
            describe('create', function () {
                it('should request detect from detector', function () {
                    spyOn(detectorMock, 'detect').and.callFake(function () {
                        return saveStates.NES_NESTOPIA;
                    });
                    spyOn(nestopiaOriginalExtractorMock, 'extract').and.callFake(function () {
                        return undefined;
                    });
                    m.create(bytes);
                    expect(detectorMock.detect).toHaveBeenCalledWith(bytes);
                });

                it('should request extract from nestopiaOriginalExtractor if saveState is Nestopia Original',
                    function () {
                        spyOn(detectorMock, 'detect').and.callFake(function () {
                            return saveStates.NES_NESTOPIA;
                        });
                        spyOn(nestopiaOriginalExtractorMock, 'extract').and.callFake(function () {
                            return undefined;
                        });
                        m.create(bytes);
                        expect(nestopiaOriginalExtractorMock.extract).toHaveBeenCalledWith(bytes,
                            saveStates.NES_NESTOPIA.TYPE);
                    });

                it('should throw if saveState is unknown', function () {
                    spyOn(detectorMock, 'detect').and.callFake(function () {
                        return saveStates.UNKNOWN;
                    });
                    expect(function () { m.create(bytes); }).toThrow(
                        'Unexpected save state type.'
                    );
                });
            });
        });
    });