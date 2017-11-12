'use strict';

module.exports = function(gulp) {
  return () => {
    const plugin = require('../build/typescript/gulp');
    const pkg = require('../package.json');
    return gulp
      .src([
        'src/articles/**/*.md',
        'src/pages/**/*.json',
        'src/*.html',
        'src/*.txt'
      ])
      .pipe(plugin.parseMetaFile())
      .pipe(plugin.toArticle())
      .pipe(plugin.addIndex())
      .pipe(plugin.addSitemap())
      .pipe(plugin.addMetafiles())
      .pipe(plugin.adaptPaths())
      .pipe(plugin.createLayoutHtml(pkg))
      .pipe(plugin.wrapHtml('src/templates/index.jade', pkg))
      .pipe(gulp.dest('build'));
  };
};
