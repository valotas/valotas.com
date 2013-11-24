module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wintersmith');

  grunt.initConfig({
    wintersmith: {
      preview: {
        options: {
          action: 'preview'
        }
      }
    }
  });

  grunt.registerTask('preview', ['wintersmith:preview']);
};
