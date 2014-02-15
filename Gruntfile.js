module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var readFileIfExists = function (path) {
    var f = grunt.file;
    if (f.exists(path)) {
      return f.read(path);
    } else {
      return null;
    }
  };

  grunt.initConfig({
    clean: {
      build: ['build']
    },
    jshint: {
      all: ['Gruntfile.js']
    },
    watch: {
      ts: {
        files: ['server/**/*.ts'],
        tasks: ['ts:server', 'mochacli:server', 'develop:server'],
        options: {
          nospawn: true
        }
      },
      js: {
        files: ['**/*.js', '!build/**', '!node_modules/**'],
        tasks: ['jshint:all'],
        options: {
          nospawn: true
        }
      }
    },
    ts: {
      server: {
        src: ['server/**/*.ts'],
        outDir:'build',
        options: {
          target: 'es5',
          module: 'commonjs'
        }
      }
    },
    mochacli: {
      server: {
        options: {
          files: ['build/*.spec.js'],
          reporter: 'spec',
          require: ['chai']
        }
      }
    },
    develop: {
      server: {
        file: 'build/app.js',
        nodeArgs: ['--debug']
      }
    },
    sftp: {
      build: {
        files: {
          './': 'build/**'
        },
        options: {
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

  grunt.registerTask('build', ['clean:build', 'jshint:all', 'ts:server', 'mochacli:server']);
  grunt.registerTask('dev', ['build', 'develop:server', 'watch:ts', 'watch:js']);
  grunt.registerTask('preview', ['wintersmith:preview']);
  grunt.registerTask('deploy', ['wintersmith:build', 'sftp:build']);
};
