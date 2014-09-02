/*jshint node:true*/

'use strict';

var fs = require('fs');
var os = require('os');
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
    var file = path.join(originalAssets, filename);
    var content = fs.readFileSync(file, 'utf-8');
    var ext = path.extname(filename);
    var targetFileName  = md5(content) + ext;
    ensureFileExists(file, targetFileName);
    var result = path.join(assets, targetFileName);
    if (path.sep === '\\') {
      result = result.replace(/\\/g, '/');
    }
    return result;
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