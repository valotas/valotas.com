/*jshint node:true*/
/*globals describe, it, expect, beforeEach*/

'use strict';

var path = require('path');
var fs = require('fs');
var middleware = require('./asset-middleware');

var commonContext = {
  originalAssets: '/tmp',
  assets: '/path/to/assets' 
};

var toThrowNamedMatcher = {
  compare: function (actual, expected) {
    try {
      actual();
      return {
        pass: false,
        message: 'Expected exception: "' + expected + '" but got nothing'
      };
    } catch (e) {
      return {
        pass: e.name === expected,
        message: e.name + ' is not equal to ' + expected
      };
    }
  }
};

function noop() {}

function runMiddlewareAndGetAsset(context) {
  context = context || commonContext;
  var params = {
    context: commonContext
  };
  middleware(params, noop);
  return params.context.asset;
}

describe('asset-middleware', function () {
  beforeEach(function () {
    this.addMatchers({ toThrowNamed: toThrowNamedMatcher });
  });
  
  it('should throw an exception if no originalAssets is present', function () {
    expect(function () {
      runMiddlewareAndGetAsset({}); 
    }).toTrowNamed('IllegalContextException');
  });
  
  it('should add an asset() function to the given context', function () {
    var asset = runMiddlewareAndGetAsset();
    expect(asset).not.toBeUndefined();
  });
  
  describe('asset()', function () {
    var file;
    
    beforeEach(function () {
      file = '/tmp/assemble-asset-middleware.spec.js';
      fs.writeFileSync(file, fs.readFileSync(path.resolve(__filename)));
    });
    
    it('should return a file with the same extention', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFilename = asset(file);
      expect(path.extname(assetFilename)).toEqual('.js');
    });
    
    it('should return a filename prefix with the assets path', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFilename = asset(file);
      expect(assetFilename.indexOf('/path/to/assets/')).toEqual(0);
    });
    
    it('should create the hashed file if that does not exists', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFileName = asset(file);
      var baseName = path.basename(assetFileName);
      expect(fs.existsSync('/tmp/' + baseName)).toEqual(true);
    });
  });
  
});
