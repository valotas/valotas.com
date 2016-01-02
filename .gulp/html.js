'use strict';

module.exports = function (gulp) {
  return function () {
    var plugin = require('../build/typescript/gulp');
    return gulp.src([
        'src/articles/**/*.md'
      ])
      .pipe(plugin.mdFile())
      .pipe(plugin.toArticle())
      .pipe(plugin.addIndex())
      .pipe(plugin.addMetafiles())
      .pipe(plugin.adaptPaths())
      .pipe(plugin.wrapHtml('src/templates/index.jade'))
      .pipe(gulp.dest('build'))
  };
};
