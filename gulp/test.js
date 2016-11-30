/*eslint-env node*/

'use strict';

var jasmine = require('gulp-jasmine');

module.exports = function (gulp, path) {
  return function () {
    gulp.src(path)
      .pipe(jasmine());
  };
};
