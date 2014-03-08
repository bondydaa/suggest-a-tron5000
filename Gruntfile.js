module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['src/styles/*.scss'],
        tasks: ['compass:dist']
      },
      imagemin: {
        files: ['src/images/*.{png,jpg,gif}'],
        tasks: ['imagemin:dynamic']
      },
      assemble: {
        files: ['src/{,*/}*.hbs'],
        tasks: ['assemble:dist']
      },
      concat: {
        files: ['src/scripts/*.js'],
        tasks: ['concat:dist']
      }
    },

    assemble: {
      options: {
        partials: ['src/_includes/**/*.hbs'],
        layoutdir: 'src/_layouts/',
        layout: ['default.hbs'],
        data: ['src/_data/**/*.{json,yml}'],
        postprocess: require('pretty')
      },
      dist: {
        expand: true,
        cwd: 'src/',
        src: ['eorder/{,*/}*.hbs'],
        dest: 'app'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'src/styles/',
        cssDir: 'app/css',
        imagesDir: 'src/images',
        javascriptsDir: 'src/scripts',
        fontsDir: 'src/fonts',
        httpImagesPath: '/images',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        outputStyle: 'expanded',
        noLineComments: true
      },
      dist: {
        options: {
          noLineComments: true
        }
      }
    },

    concat: {
      options: {
        separator: grunt.util.linefeed + grunt.util.linefeed,
        banner: '(function ($, global) {' + grunt.util.linefeed + grunt.util.linefeed,
        footer: grunt.util.linefeed + grunt.util.linefeed + '})(jQuery, this);'
      },
      dist: {
        src: 'src/scripts/*.js',
        dest: 'scripts/main.js',
      },
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: ['**/*.{jpg,png}'],
          dest: 'images/'
        }]
      }
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', [
    'assemble:dist'
  ]);

};