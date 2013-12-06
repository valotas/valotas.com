module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

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
        tasks: ['ts:server', 'develop:server'],
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

  grunt.registerTask('build', ['clean:build', 'ts:server']);
  grunt.registerTask('dev', ['build', 'jshint:all', 'develop:server', 'watch:ts', 'watch:js']);
  grunt.registerTask('preview', ['wintersmith:preview']);
  grunt.registerTask('deploy', ['wintersmith:build', 'sftp:build']);
};
