/*jshint node:true*/

'use strict';

//var md5 = require('MD5');

var asset = function (filename) {
  return 'md5-hash-of-' + filename;
};

var middleware = function (param, next) {
  param.context.asset = asset;
  next();
};

middleware.options = {
  stage: 'render:pre:page'
};


module.exports = middleware;