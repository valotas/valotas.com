/*jshint node:true*/
"use strict";

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
    //site: grunt.file.readYAML('src/_config.yml'),
    assemble: {
      options: {
        jade: {
          layout: 'src/templates/article.jade' //the default layout
        },
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
    clean: {
      build: ['build']
    },
    jshint: {
      all: ['Gruntfile.js', 'assemble/**.js']
    }
  });

  grunt.registerTask('default', ['clean', 'jshint', 'less:site', 'assemble']);

};
