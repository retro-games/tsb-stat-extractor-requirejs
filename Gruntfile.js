/**
 * Created by Ed on 11/29/14.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            src: {
                rjsConfig: 'src/config.js'
            }
        },

        clean: ['coverage', 'dist'],

        jslint: {
            all: {
                src: [
                    'spec/**/*.js',
                    'src/**/*.js',
                    'Gruntfile.js',
                    'karma.conf.js'
                ],
                exclude: [
                    'spec/test-main.js',
                    'src/config.js'
                ],
                directives: {
                    browser: true,
                    plusplus: true,
                    globals: [
                        'Int16Array',
                        'Uint8Array',
                        'beforeEach',
                        'define',
                        'describe',
                        'expect',
                        'fixture',
                        'it',
                        'module',
                        'spyOn'
                    ],
                    regexp: true
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    mainConfigFile: 'src/config.js',
                    name: 'main',
                    out: 'dist/tsbstatextractor.js',
                    paths: {
                        "jquery": "empty:"
                    },
                    wrap: {
                        endFile: 'src/tsbex-footer.js'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bower', 'clean', 'jslint', 'karma', 'requirejs']);
};