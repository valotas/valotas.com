'use strict';

const merge = require('merge-stream');
const eslint = require('gulp-eslint');
const tslint = require('gulp-tslint');

module.exports = function (gulp) {
  return function () {
    const es = gulp.src([
        'gulpfile.js',
        'gulp/**/*.js'
      ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
      
    const ts = gulp.src([
        'src/**/*.ts',
        'src/**/*.tsx'
      ])
      .pipe(tslint({
        formatter: 'verbose'
      }))
      .pipe(tslint.report());
      
    return merge(es, ts);
  };
};
