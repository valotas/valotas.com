/*jshint node:true*/

'use strict';

var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

function noop() {

}

module.exports = function (gulp, onChange) {
  return function () {
    return gulp.src('./src/assets/main.less')
      .pipe(less())
      .pipe(cssmin())
      .pipe(gulp.dest('./build/assets'))
      .pipe(gulp.dest('./build/assets'))
      .on('change',  onChange || noop);
  };
};
