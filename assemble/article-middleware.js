/*jshint node:true*/

'use strict';

function addArticleInfo (page) {
  page.article = 'xxx';
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
