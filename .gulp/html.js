'use strict';

var useref = require('gulp-useref'),
  htmlmin = require('gulp-htmlmin');

module.exports = function (gulp) {
  return function () {
    return gulp.src('src/index.html')
      .pipe(useref())
      .pipe(htmlmin())
      .pipe(gulp.dest('build'))
  };
};
