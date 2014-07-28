/*jshint node:true*/
'use strict';

var path = require('path');


function decorate(page) {
  var link = page.dirname.substring('build/'.length, page.dirname.length) + '/';
  page.link = function(otherPath) {
    if (otherPath) {
      return path.relative(link, otherPath);
    }
    return link;
  };
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
