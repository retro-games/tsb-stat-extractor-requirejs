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

        clean: ['coverage', 'dist'],

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
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bower', 'clean', 'karma', 'requirejs']);
};