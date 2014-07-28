/*jshint node:true*/
"use strict";

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-jasmine-node');

  function readFileIfExists (path) {
    var f = grunt.file;
    if (f.exists(path)) {
      return f.read(path);
    } else {
      return null;
    }
  }

  grunt.initConfig({
    assemble: {
      options: {
        jade: {
          templates: 'src/templates/',
          defaultTemplate: 'article.jade'
        },
        assets: 'build/assets',
        plugins: ['assemble/*.js'],
        initializeEngine: function (engine) {
          engine.engine = require('./assemble/engine');
        },
        flatten: true
      },
      site: {
        files: [
          {
            expand: true,
            cwd: 'src/articles',
            src: [ '**/*.md' ],
            dest: 'build/',
            rename: function (dest, src) {
              var endsWithIndex = src.indexOf('/index.md', src.length - '/index.md'.length) !== -1;
              dest = dest + src.substring(0, src.length - 3);
              if (!endsWithIndex) {
                dest += '/index';
              }
              return dest;
            }
          },
          { expand: true, cwd: 'src/templates', src: 'index.jade', dest: 'build/' }
        ]
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
    },
    sftp: {
      build: {
        files: {
          './': 'build/**'
        },
        options: {
          showProgress: true,
          path: '/var/www/valotas.com/',
          srcBasePath: 'build/',
          host: 'pi',
          createDirectories: true,
          username: 'valotas',
          privateKey: readFileIfExists("/home/valotas/.ssh/id_rsa"),
          passphrase: readFileIfExists("/home/valotas/.ssh/id_rsa.pass")
        }
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jasmine_node:all']);
  grunt.registerTask('default', ['clean', 'test', 'less:site', 'copy:assets', 'assemble']);
  grunt.registerTask('deploy', ['sftp:build']);
};
