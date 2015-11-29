/*eslint-env node */

'use strict';

var gulp = require('gulp');
var clean = require('rimraf');

gulp.task('clean-build', function (done) {
  clean('./build', done);
});

gulp.task('lint', require('./.gulp/lint')(gulp));
