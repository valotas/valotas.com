'use strict';

var htmlmin = require('gulp-htmlmin'),
  gulpif = require('gulp-if'),
  rev = require('gulp-rev'),
  inject = require('gulp-inject');

module.exports = function (gulp) {
  return function () {
    var injectables = gulp.src([
        './build/assets/**'
      ])
      .pipe(gulpif('*.js', rev()))
      .pipe(gulpif('*.css', rev()))
      .pipe(gulp.dest('./dist/assets'));

    return gulp.src([
        './build/**/*.html'
      ])
      .pipe(inject(injectables, {ignorePath: 'dist'}))
      .pipe(htmlmin())
      .pipe(gulp.dest('./dist'));
  };
};
