module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-ssh');

  var readFileIfExists = function (path) {
    var f = grunt.file;
    if (f.exists(path)) {
      return f.read(path);
    } else {
      return null;
    }
  };

  grunt.initConfig({
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

  grunt.registerTask('preview', ['wintersmith:preview']);
  grunt.registerTask('deploy', ['wintersmith:build', 'sftp:build']);
};
