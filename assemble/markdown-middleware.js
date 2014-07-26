/*jshint node:true*/
'use strict';

var markdown = require('markdown').markdown;

var isMdFile = function (file) {
  return file.indexOf('.md', file.length - 3) !== -1;
};

var middleware = function (param, next) {
  var page = param.context.page;
  if (isMdFile(page.src)) {
    page.html = function () {
      return markdown.toHTML(page.page);
    };
  }
  next();
};

middleware.options = {
  stage: 'render:pre:page'
};
module.exports = middleware;
