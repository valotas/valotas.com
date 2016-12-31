'use strict';

const jasmine = require('gulp-jasmine');

module.exports = function (gulp, path) {
  return () => {
    gulp.src(path)
      .pipe(jasmine());
  };
};
