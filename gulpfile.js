/*eslint-env node */

'use strict';

var gulp = require('gulp');
var clean = require('rimraf');

gulp.task('clean-build', function (done) {
  clean('./build', done);
});

gulp.task('lint', require('./.gulp/lint')(gulp));

gulp.task('copy-assets', ['clean-build'], function () {
  return gulp.src([
      './src/assets/**/*',
      '!./src/assets/fonts',
      '!./src/assets/*.less'
    ])
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('build', ['copy-assets']);