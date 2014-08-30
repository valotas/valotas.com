/*jshint node:true*/

'use strict';

var fs = require('fs');
var path = require('path');
var md5 = require('MD5');

function createAsset(assets) {
  return function (filename) {
    var content = fs.readFileSync(filename, 'utf-8');
    var ext = path.extname(filename);
    return assets + '/' + md5(content) + ext;
  };
}

var middleware = function (param, next) {
  param.context.asset = createAsset(param.context.assets);
  next();
};

middleware.options = {
  stage: 'render:pre:page'
};


module.exports = middleware;