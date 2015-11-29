'use strict';

var eslint = require('gulp-eslint');

module.exports = function (gulp) {
  return function () {
    return gulp.src([
        'gulpfile.js',
        'src/**/*.js',
        'src/**/*.jsx',
        '.gulp/**/*.js'
      ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  };
};
