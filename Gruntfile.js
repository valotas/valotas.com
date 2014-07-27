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
        plugins: ['assemble/*.js'],
        initializeEngine: function (engine) {
          engine.engine = require('./assemble/engine');
        }
      },
      site: {
        options: {
          expand: true,
          cwd: 'src',
          rename: function (dest, src) {
            console.log(dest, src);
            return dest;
          }
        },
        files: {
          'build/': ['src/articles/**/*.md']
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
