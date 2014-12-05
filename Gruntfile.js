/**
 * Created by Ed on 11/29/14.
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            src: {
                rjsConfig: 'src/config.js'
            }
        },

        jasmine: {
            dev: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/**/*.spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'src/config.js',
                        requireConfig: {
                            baseUrl: 'src/'
                        }
                    }
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
                    out: 'dist/tsbextractor.js',
                    paths: {
                        "jquery": "empty:"
                    },
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bower', 'jasmine', 'karma', 'requirejs']);
};