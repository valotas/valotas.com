module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wintersmith');

  grunt.initConfig({
    wintersmith: {
      build: {},
      preview: {
        options: {
          action: 'preview'
        }
      }
    }
  });

  grunt.registerTask('preview', ['wintersmith:preview']);
  grunt.registerTask('deploy', ['wintersmith:build']);
};
