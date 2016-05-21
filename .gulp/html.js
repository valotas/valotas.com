'use strict';

var pkg = require('../package.json');

module.exports = function (gulp) {
  return function () {
    var plugin = require('../build/typescript/gulp');
    return gulp.src([
        'src/articles/**/*.md',
        'src/*.html',
        'src/*.txt'
      ])
      .pipe(plugin.mdFile())
      .pipe(plugin.toArticle())
      .pipe(plugin.addIndex())
      .pipe(plugin.addSitemap())
      .pipe(plugin.addMetafiles())
      .pipe(plugin.adaptPaths())
      .pipe(plugin.createLayoutHtml(pkg))
      .pipe(plugin.wrapHtml('src/templates/index.jade', pkg))
      .pipe(gulp.dest('build'))
  };
};
