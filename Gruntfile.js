module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wintersmith');
  //grunt.loadNpmTasks('grunt-scp');
  grunt.loadNpmTasks('grunt-ssh');
  

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
          privateKey: grunt.file.read("/home/valotas/.ssh/id_rsa"),
          //privateKey: require('fs').readFileSync('/home/valotas/.ssh/id_rsa'),
          passphrase: grunt.file.read("/home/valotas/.ssh/id_rsa.pass")
        }
      }
    }
  });

  grunt.registerTask('preview', ['wintersmith:preview']);
  grunt.registerTask('deploy', ['wintersmith:build', 'sftp:build']);
};
