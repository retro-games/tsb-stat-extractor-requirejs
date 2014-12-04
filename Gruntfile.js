/**
 * Created by Ed on 11/29/14.
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            target: {
                rjsConfig: 'src/config.js'
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    mainConfigFile: 'src/config.js',
                    include: 'test',
                    out: 'dist/tsbextractor.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['bower', 'requirejs']);
};