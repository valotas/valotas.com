'use strict';

const jasmine = require('gulp-jasmine');

module.exports = function (gulp, path) {
  return function () {
    gulp.src(path)
      .pipe(jasmine());
  };
};
