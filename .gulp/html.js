'use strict';

var gulpif = require('gulp-if'), 
  useref = require('gulp-useref'),
  htmlmin = require('gulp-htmlmin');

module.exports = function (gulp) {
  return function () {
    var plugin = require('../build/gulp');
    return gulp.src([
        'src/articles/**/*.md',
        'src/index.html'
      ])
      .pipe(plugin.mdFile())
      .pipe(plugin.toArticle())
      .pipe(gulpif('*.html', useref()))
      .pipe(gulpif('*.html', htmlmin()))
      .pipe(gulp.dest('build'))
  };
};
