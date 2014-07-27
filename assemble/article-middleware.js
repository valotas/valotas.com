/*jshint node:true*/

'use strict';

var moment = require('moment');

function Article(page) {

  this.moment = function () {
    return moment(page.date);
  };

  this.date = function (format) {
    return this.moment().format(format || 'DD/MM/YYYY');
  };
}

function addArticleInfo (page) {
  page.article = new Article(page);
}

var middleware = function (param, next) {
  var page = param.context.page;
  addArticleInfo(page);
  next();
};

middleware.options = {
  stage: 'render:pre:page'
};

module.exports = middleware;
