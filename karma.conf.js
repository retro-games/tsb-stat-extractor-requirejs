// Karma configuration
// Generated on Thu Dec 04 2014 20:49:32 GMT-0600 (CST)

module.exports = function (config) {
    'use strict';

    var customLaunchers = {
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '11'
        },
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: '39'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            platform: 'Windows 7',
            version: '34'
        },
        sl_ios_safari: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.9',
            version: '7'
        },
        sl_opera: {
            base: 'SauceLabs',
            browserName: 'opera',
            platform: 'Windows 7',
            version: '12'
        }
    };

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs', 'fixture'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'src/**/*.js', included: false},
            {pattern: 'spec/**/*.spec.js', included: false},
            {pattern: 'spec/fixtures/**/*.json'},
            {pattern: 'spec/helpers/*.js'},
            'spec/test-main.js'
        ],

        // list of files to exclude
        exclude: [
            'src/config.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': 'coverage',
            '**/*.html' : ['html2js'],
            '**/*.json' : ['html2js']
        },

        sauceLabs: {
            testName: 'tsb-stat-extractor unit tests'
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['dots', 'saucelabs'],

        junitReporter: {
            outputFile: 'test-results.xml'
        },

        coverageReporter: {
            type: 'cobertura',
            dir: 'coverage/',
            file: 'coverage.xml'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
