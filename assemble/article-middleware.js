/*jshint node:true*/

'use strict';

var moment = require('moment');

function Article(page) {

  this.page = page;

  this.moment = function () {
    return moment(page.data.date);
  };

  this.date = function (format) {
    return this.moment().format(format || 'DD/MM/YYYY');
  };

  this.html = function () {
    return page.html ? page.html() : '';
  };

  this.description = function () {
    if (page.description) {
      return page.description;
    }
    if (page.html) {
      var html = page.html();
      return html.substring(0, html.indexOf('<h2 id='));
    }
    return '';
  };
}

function buildArticles(pages) {
  return pages.map(function (p) {
    return new Article(p);
  });
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