'use strict';

//var useref = require('gulp-useref'),
//  htmlmin = require('gulp-htmlmin');

module.exports = function (gulp) {
  return function () {
    return gulp.src('src/articles/**/*.md')
      .pipe(require('../build/gulp').transform())
      //.pipe(useref())
      //.pipe(htmlmin())
      .pipe(gulp.dest('build'))
  };
};
