/*jshint node:true*/

'use strict';

var moment = require('moment'),
    INPUT_FORMAT = [
      'YYYY-MM-DD HH:mm',
      'YYYY-MM-DD'
    ];

function Article(page) {
  this.page = page;

  this.moment = function () {
    var date = page.data.date;
    var m = moment(date, INPUT_FORMAT);
    if (m.isValid()) {
      return m;
    }
    throw {
      name: 'IllegalFormatException',
      message: 'Could not parse ' + date + ' as date using formats: ' + INPUT_FORMAT
    };
  };

  this.date = function (format) {
    return this.moment().format(format || 'DD/MM/YYYY');
  };

  this.html = function () {
    var html = page.html ? page.html() : '';
    if (html.length > 4) {
      html = html.replace(/<p>(.)(.*)/, '<p><span class="first-letter">$1</span>$2');
    }
    return html;
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
  var articles = [];
  pages.map(function (p) {
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
