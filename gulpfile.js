/*eslint-env node */

'use strict';

var gulp = require('gulp');
var clean = require('rimraf');
var ts = require('./.gulp/ts');
var browserSync = require('browser-sync').create();

gulp.task('clean-build', function (done) {
  clean('./build', done);
});

gulp.task('clean-dist', function (done) {
  clean('./dist', done);
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

gulp.task('css:only', require('./.gulp/css')(gulp));

gulp.task('css', ['clean-build', 'css:only']);

gulp.task('tsc', ['clean-build'], ts.task(gulp));

gulp.task('tsc-bundle', ['tsc'], ts.bundle(gulp, __dirname));

gulp.task('html', ['tsc'], require('./.gulp/html')(gulp));

gulp.task('test', require('./.gulp/test')(gulp, 'build/**/*.spec.js'));

gulp.task('lint-test', ['lint', 'test']);

gulp.task('tdd', ['test'], function () {
  ts.watch();
  gulp.watch('build/**/*.spec.js', ['test']);
});

gulp.task('build', [
  'copy-assets',
  'css',
  'tsc',
  'html'
]);

gulp.task('serve', [
    'build'
  ],
  function () {
    gulp.watch('src/**/*.less', ['css:only']);
    browserSync.init({
      logLevel: 'debug',
      server: {
        baseDir: './build',
        routes: {
          '/node_modules': 'node_modules',
          '/system.conf.js': 'system.conf.js'
        }
      },
      watchOptions: {
        ignoreInitial: true,
        ignored: 'node_modules/**'
      }
    });
  }
);

gulp.task('play', ['serve']);


gulp.task('dist', [
  'clean-dist',
  'tsc-bundle',
  'build'
], require('./.gulp/bundle')(gulp));

gulp.task('serve-dist', 
  function () {
    browserSync.init({
      logLevel: 'debug',
      server: {
        baseDir: './dist'
      },
      watchOptions: {
        ignoreInitial: true,
        ignored: 'node_modules/**'
      }
    });
  }
);
