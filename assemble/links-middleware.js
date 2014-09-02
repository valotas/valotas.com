/*jshint node:true*/
'use strict';

var path = require('path');

function decorate(page) {
  var link = page.dirname.substring('build/'.length, page.dirname.length) + '/';
  page.link = function(otherPath) {
    if (otherPath) {
      if (otherPath.indexOf('/') === 0) {
        otherPath = otherPath.substring(1);
      }
      var relativePath = path.relative(link, otherPath);
      if  (path.sep === '\\') {
        relativePath = relativePath.replace(/\\/g, '/');
      }
      return relativePath;
    }
    return link;
  };
}

var middleware = function (param, next) {
  if (!(next)) {
    return decorate(param);
  }
  param.assemble.options.pages.forEach(function (page) {
    decorate(page);
  });
  next();
};

middleware.options = {
  stage: 'render:pre:pages'
};
module.exports = middleware;
