'use strict';

var gulpif = require('gulp-if'), 
  htmlreplace = require('gulp-html-replace'),
  htmlmin = require('gulp-htmlmin');

module.exports = function (gulp) {
  return function () {
    var plugin = require('../build/typescript/gulp');
    return gulp.src([
        'src/articles/**/*.md'
      ])
      .pipe(plugin.mdFile())
      .pipe(plugin.toArticle())
      .pipe(plugin.addIndex())
      .pipe(plugin.wrapHtml('src/templates/index.jade'))
      .pipe(gulpif('*.html', htmlreplace({
        'css': 'assets/main.css',
        'js': 'typescript/main.js'
      })))
      .pipe(gulpif('*.html', htmlmin()))
      .pipe(gulp.dest('build'))
  };
};
