/* global module:false */
module.exports = function(grunt) {
    var port = grunt.option('port') || 8000
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:
                '/*!\n' +
                ' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                ' * http://lab.hakim.se/reveal-js\n' +
                ' * MIT licensed\n' +
                ' *\n' +
                ' * Copyright (C) 2013 Hakim El Hattab, http://hakim.se\n' +
                ' */'
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            build: {
                src: 'js/reveal.js',
                dest: 'js/reveal.min.js'
            }
        },

        cssmin: {
            compress: {
                files: {
                    'css/reveal.min.css': ['css/reveal.css']
                }
            }
        },

        sass: {
            main: {
                files: {
                    'css/theme/default.css': 'css/theme/source/default.scss',
                    'css/theme/beige.css': 'css/theme/source/beige.scss',
                    'css/theme/night.css': 'css/theme/source/night.scss',
                    'css/theme/serif.css': 'css/theme/source/serif.scss',
                    'css/theme/simple.css': 'css/theme/source/simple.scss',
                    'css/theme/sky.css': 'css/theme/source/sky.scss',
                    'css/theme/moon.css': 'css/theme/source/moon.scss',
                    'css/theme/solarized.css': 'css/theme/source/solarized.scss'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: '.'
                }
            }
        },

        zip: {
            'reveal-js-presentation.zip': [
                'index.html',
                'css/**',
                'js/**',
                'lib/**',
                'images/**',
                'plugin/**'
            ]
        },

        watch: {
            options: {
                livereload: true
            },
            main: {
                files: ['Gruntfile.js', 'js/reveal.js', 'css/reveal.css', 'index.js'],
                tasks: 'default'
            },
            jade: {
                files: ['**/*.jade'],
                tasks: 'build',
            },
            theme: {
                files: ['css/theme/source/*.scss', 'css/theme/template/*.scss'],
                tasks: 'themes'
            }
        },

        jade: {
            dev: {
                files: [{
                    expand: true,
                    src: ['*.jade'],
                    dest: '.',
                    ext: '.html'
                }]
            }
        },

        browserify: {
            main: {
                files: {
                    'bundle.js': ['index.js']
                }
            }
        }

    })

    // Dependencies
    grunt.loadNpmTasks('grunt-contrib-cssmin' )
    grunt.loadNpmTasks('grunt-contrib-uglify' )
    grunt.loadNpmTasks('grunt-contrib-watch' )
    grunt.loadNpmTasks('grunt-contrib-sass' )
    grunt.loadNpmTasks('grunt-contrib-connect' )
    grunt.loadNpmTasks('grunt-contrib-jade' )
    grunt.loadNpmTasks('grunt-browserify' )
    grunt.loadNpmTasks('grunt-zip' )


    // Build task
    grunt.registerTask('build', ['jade', 'browserify:main'])

    // Theme task
    grunt.registerTask('themes', ['sass'] )

    // Package presentation to archive
    grunt.registerTask('package', ['default', 'zip'] )

    // Minify css & js
    grunt.registerTask('minify', ['cssmin', 'uglify'] )

    // Default task: serve presentation locally
    grunt.registerTask('default', ['build', 'connect', 'watch'] )

}
