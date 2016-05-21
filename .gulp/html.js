/*eslint-env node*/

'use strict';
var fs = require('fs');

module.exports = function (gulp) {
  return function () {
    var plugin = require('../build/typescript/gulp');
    var pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));
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
