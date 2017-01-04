/*eslint-env node */

'use strict';

const gulp = require('gulp');
const clean = require('rimraf');
const ts = require('./gulp/ts');
const browserSync = require('browser-sync').create();

gulp.task('clean-build', (done) => {
  clean('./build', done);
});

gulp.task('clean-dist', (done) => {
  clean('./dist', done);
});

gulp.task('copy-assets', ['clean-build'], () => {
  return gulp.src([
    './src/assets/**/*',
    '!./src/assets/fonts'
  ])
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('css:only', require('./gulp/css')(gulp));

gulp.task('css', ['clean-build', 'css:only']);

gulp.task('tsc', ['clean-build'], ts.task(gulp));

gulp.task('tsc-bundle', ['tsc'], ts.bundle(gulp, __dirname));

gulp.task('html', ['tsc'], require('./gulp/html')(gulp));

gulp.task('test', require('./gulp/test')(gulp, 'build/**/*.spec.js'));

gulp.task('tdd', ['test'], () => {
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
  () => {
    gulp.watch('src/sass/**/*.scss', ['css:only']);
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
], require('./gulp/bundle')(gulp));

gulp.task('serve-dist', () => {
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
});
