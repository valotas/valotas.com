'use strict';

var merge = require('merge-stream');
var eslint = require('gulp-eslint');
var tslint = require('gulp-tslint');

module.exports = function (gulp) {
  return function () {
    var es = gulp.src([
        'gulpfile.js',
        'src/**/*.js',
        'src/**/*.jsx',
        '.gulp/**/*.js'
      ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
      
    var ts = gulp.src([
        'src/**/*.ts',
        'src/**/*.tsx'
      ])
      .pipe(tslint())
      .pipe(tslint.report('verbose'));
      
    return merge(es, ts);
  };
};
