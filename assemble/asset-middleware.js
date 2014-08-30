/*jshint node:true*/

'use strict';

var fs = require('fs');
var path = require('path');
var md5 = require('MD5');

function ensureFileExists(sourceFile, targetFileName) {
  var dirname = path.dirname(sourceFile);
  var targetFile = path.join(dirname, targetFileName);
  if (!fs.existsSync(targetFile)) {
    fs.writeFileSync(targetFile, fs.readFileSync(sourceFile)); 
  }
}

function createAsset(assets, originalAssets) {
  if (!(assets)) {
    throw {
      name: 'IllegalContextException',
      message: 'Assets property does not exists within given context'
    };
  }
  
  if (!(originalAssets)) {
    throw {
      name: 'IllegalContextException',
      message: 'originalAssets property does not exists within given context'
    };
  }

  return function (filename) {
    var content = fs.readFileSync(filename, 'utf-8');
    var ext = path.extname(filename);
    var targetFileName  = md5(content) + ext;
    ensureFileExists(filename, targetFileName);
    return path.join(assets, targetFileName);
  };
}

var middleware = function (param, next) {
  param.context.asset = createAsset(param.context.assets, param.context.originalAssets);
  next();
};

middleware.options = {
  stage: 'render:pre:page'
};


module.exports = middleware;