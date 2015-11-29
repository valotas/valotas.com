/*eslint-env node */

'use strict';

var gulp = require('gulp');
var clean = require('rimraf');
var browserSync = require('browser-sync').create();

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

gulp.task('css', ['clean-build'], require('./.gulp/css')(gulp));

gulp.task('build-index', ['clean-build'], require('./.gulp/html')(gulp));

gulp.task('build', [
  'lint',
  'copy-assets',
  'css',
  'build-index'
]);

gulp.task('serve', [
    'build'
  ],
  function () {
    browserSync.init({
      logLevel: 'debug',
      server: {
        baseDir: [
          //'./src',
          './build'
        ]
      },
      watchOptions: {
        ignoreInitial: true,
        ignored: 'node_modules/**'
      }
    });
  }
);

gulp.task('play', ['serve']);

