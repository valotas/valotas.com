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

  this.html = function () {
    return page.html ? page.html() : '';
  };
}

var middleware = function (param, next) {
  var page = param.context.page;
  param.context.article = new Article(page);
  next();
};

middleware.options = {
  stage: 'render:pre:page'
};

module.exports = middleware;
