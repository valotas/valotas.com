/*jshint node:true*/

'use strict';

var Article = require('./Article');

function buildArticles(pages) {
  var articles = [];
  pages.forEach(function (p) {
    if (p.dest !== 'build/index.html') {
      articles.push(new Article(p));
    }
  });
  articles.sort(function (a, b) {
    return a.moment().isAfter(b.moment()) ? -1 : 1;
  });
  return articles;
}

var middleware = function (param, next) {
  if (param.stage === 'render:pre:page') {
    param.context.article = new Article(param.context.page);
  }
  else if (param.stage === 'render:pre:pages') {
    param.assemble.options.articles = buildArticles(param.assemble.options.pages);
  }
  next();
};

middleware.options = {
  stage: 'render:pre:*'
};

module.exports = middleware;
