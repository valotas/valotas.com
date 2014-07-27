/*jshint node:true*/
'use strict';

var marked = require('marked');

function isMdFile(file) {
  return file.indexOf('.md', file.length - 3) !== -1;
}

function decorate(page) {
  if (isMdFile(page.src)) {
    page.html = function () {
      return marked(page.page);
    };
    page.md = true;
  }
}

var middleware = function (param, next) {
  param.assemble.options.pages.forEach(function (page) {
    decorate(page);
  });
  next();
};

middleware.options = {
  stage: 'render:pre:pages'
};
module.exports = middleware;
