module.exports = function (grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json');
    for (var taskName in pkg.devDependencies) {
        if (taskName.indexOf('grunt-') !== -1) {
            grunt.loadNpmTasks(taskName);
        }
    }

    grunt.initConfig({
        connect: {
            options: {
                port: 7378,
                livereload: 35729,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:7378/index.html'
                    },
                    base: [
                        './build'
                    ]
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['**/build/**/*', '**/thirdparty/**/*', '**/node_modules/**/*']
            },
            src: ['src/**/*.js']
        },

        concat: {
            custom: {
                options: {
                    separator: ';'
                },
                dest: 'build/'+pkg.name+'.all.js',
                src: [
                    'src/client/**/*.js'
                ]
            }
        },

        uglify: {
            custom: {
                files: {
                    'dist/snjn.min.js': ['dist/snjn.all.js']
                }
            }
        },

        watch: {
            options: {
                debounceDelay: 1000
            },
            jsHint: {
                files: ['src/**/*.js'],
                tasks: ['newer:jshint']
            }
        }
    });

    grunt.registerTask('default', ['connect', 'watch']);
};