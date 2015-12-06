'use strict';

var jasmine = require('gulp-jasmine');

module.exports = function (gulp) {
  return function () {
    gulp.src('build/**/*.spec.js')
      .pipe(jasmine());
  };
};
