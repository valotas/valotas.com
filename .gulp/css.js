/*jshint node:true*/

'use strict';

var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');

function noop() {

}

module.exports = function (gulp, onChange) {
  return function () {
    return gulp.src('./src/sass/**/*.scss')
      .pipe(sass({
        includePaths: [
          './node_modules/foundation-sites/scss',
          './node_modules/font-awesome/scss'
        ]
      }).on('error', sass.logError))
      .pipe(cssmin())
      .pipe(gulp.dest('./build/assets'))
      .on('change',  onChange || noop);
  };
};
