/**
 * Created by Ed on 11/29/14.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['coverage', 'dist'],

        jshint: {
            all: [
                'spec/**/*.js',
                'src/**/*.js',
                'Gruntfile.js',
                'karma.conf.js'
            ]
        },

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
                        'Uint8Array',
                        'beforeEach',
                        'define',
                        'describe',
                        'expect',
                        'fixture',
                        'it',
                        'module',
                        'require',
                        'spyOn'
                    ],
                    regexp: true
                }
            }
        },

        karma: {
            phantomjs: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS'],
                reporters: ['spec', 'junit', 'coverage']
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    mainConfigFile: 'src/config.js',
                    name: 'main',
                    optimize: 'none',
                    out: 'dist/tsb-stat-extractor.js',
                    wrap: {
                        endFile: 'src/tsbex-footer.js'
                    }
                }
            }
        },

        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
            files: ['bower.json', 'package.json']
        },

        uglify: {
            release: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/tsb-stat-extractor.min.map'
                },
                src: 'dist/tsb-stat-extractor.js',
                dest: 'dist/tsb-stat-extractor.min.js'
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: "/*! tsb-stat-extractor.min.js <%= pkg.version %> */",
                linebreak: true
            },
            files: ['dist/tsb-stat-extractor.min.js']
        },

        gitadd: {
            release: {
                options: {
                    force: true
                },
                files: {
                    src: [
                        'dist/tsb-stat-extractor.js',
                        'dist/tsb-stat-extractor.min.js',
                        'dist/tsb-stat-extractor.min.map',
                        'bower.json',
                        'package.json'
                    ]
                }
            }
        },

        gitcommit: {
            release: {
                options: {
                    message: 'tsb-stat-extractor release files'
                },
                files: {
                    src: [
                        'dist/tsb-stat-extractor.js',
                        'dist/tsb-stat-extractor.min.js',
                        'dist/tsb-stat-extractor.min.map',
                        'bower.json',
                        'package.json'
                    ]
                }
            }
        },

        gitpush: {
            release: {
                options: {
                    branch: 'master',
                    remote: 'origin',
                    tags: true
                }
            }
        },

        gittag: {
            release: {
                options: {
                    tag: '<%= pkg.version %>',
                    message: 'tsb-stat-extractor tag <%= pkg.version %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['clean', 'jslint', 'jshint', 'karma:phantomjs', 'requirejs']);
    grunt.registerTask('ci', ['clean', 'jslint', 'jshint', 'karma', 'requirejs']);
    grunt.registerTask('release', function (release) {
        release = release || 'patch';
        grunt.task.run('clean');
        grunt.task.run('jslint');
        grunt.task.run('jshint');
        grunt.task.run('karma:phantomjs');
        grunt.task.run('requirejs');
        grunt.task.run('bumpup:' + release);
        grunt.task.run('uglify');
        grunt.task.run('usebanner');
        grunt.task.run('gitadd');
        grunt.task.run('gitcommit');
        grunt.task.run('gittag');
        grunt.task.run('gitpush');
    });
};