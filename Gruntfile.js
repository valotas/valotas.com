module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var readFileIfExists = function (path) {
    var f = grunt.file;
    if (f.exists(path)) {
      return f.read(path);
    } else {
      return null;
    }
  };

  grunt.initConfig({
    watch: {
      ts: {
        files: ['server/**/*.ts'],
        tasks: ['ts:server', 'develop:server'],
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
    wintersmith: {
      build: {},
      preview: {
        options: {
          action: 'preview'
        }
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

  grunt.registerTask('build', ['ts:server']);
  grunt.registerTask('dev', ['build', 'develop:server', 'watch:ts']);
  grunt.registerTask('preview', ['wintersmith:preview']);
  grunt.registerTask('deploy', ['wintersmith:build', 'sftp:build']);
};
