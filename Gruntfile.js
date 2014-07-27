/*jshint node:true*/
"use strict";

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.initConfig({
    assemble: {
      options: {
        jade: {
          layout: 'src/templates/article.jade' //the default layout
        },
        plugins: ['assemble/*.js'],
        initializeEngine: function (engine) {
          engine.engine = require('./assemble/engine');
        },
        flatten: true
      },
      site: {
        files: {
          'build/': ['src/articles/*.md']
        }
      }
    },
    less: {
      site: {
        files: {
          'build/assets/main.css': 'src/assets/main.less'
        }
      }
    },
    copy: {
      assets: {
        files: [
          { expand: true, cwd: 'src/', src: ['assets/**', '!assets/**.less'], dest: 'build/' }
        ]
      }
    },
    jasmine_node: {
      options: {
        showColors: true,
        includeStackTrace: false,
        forceExit: true
      },
      all: ['assemble/']
    },
    clean: {
      build: ['build']
    },
    jshint: {
      all: ['Gruntfile.js', 'assemble/**.js']
    }
  });

  grunt.registerTask('test', ['jshint', 'jasmine_node:all']);
  grunt.registerTask('default', ['clean', 'test', 'less:site', 'copy:assets', 'assemble']);

};
