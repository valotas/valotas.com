'use strict';

const htmlmin = require('gulp-htmlmin'),
  gulpif = require('gulp-if'),
  rev = require('gulp-rev'),
  inject = require('gulp-inject');

module.exports = function (gulp) {
  return function () {
    const injectables = gulp.src([
        './build/**/*',
        '!./build/**/*.html',
        '!./build/typescript/**/*'
      ])
      .pipe(gulpif('*.js', rev()))
      .pipe(gulpif('*.css', rev()))
      .pipe(gulp.dest('./dist'));

    return gulp.src([
        './build/**/*.html'
      ])
      .pipe(inject(injectables, {ignorePath: 'dist'}))
      .pipe(htmlmin())
      .pipe(gulp.dest('./dist'));
  };
};
