/*jshint node:true*/
/*globals describe, it, expect, beforeEach*/

'use strict';

var path = require('path');
var fs = require('fs');
var os = require('os');
var middleware = require('./asset-middleware');

var commonContext = {
  originalAssets: os.tmpdir(),
  assets: '/path/to/assets' 
};

var toThrowNamedMatcher = function (expected) {
  var exception;
  
  if (typeof this.actual !== 'function') {
    throw new Error('Given "actual" is not a function'); 
  }
  
  try {
    this.actual();
  } catch (e) {
    exception = e.name || 'undefined';
  }
  
  this.message = function () {
    return 'Expected exception: "' + expected + '" but got "' + exception + '"';
  };
  return exception && exception === expected;
};

function noop() {}

function runMiddlewareAndGetAsset(context) {
  context = context || commonContext;
  var params = {
    context: context
  };
  middleware(params, noop);
  return params.context.asset;
}

describe('asset-middleware', function () {
  beforeEach(function () {
    this.addMatchers({ toThrowNamed: toThrowNamedMatcher });
  });
  
  it('should throw an exception if no originalAssets property is present', function () {
    expect(function () {
      runMiddlewareAndGetAsset({
        assets: '/path/to/assets'
      }); 
    }).toThrowNamed('IllegalContextException');
  });
  
  it('should throw an exception if no assets property is present', function () {
    expect(function () {
      runMiddlewareAndGetAsset({
        orriginalAssets: '/path/to/original/assets'
      }); 
    }).toThrowNamed('IllegalContextException');
  });
  
  it('should add an asset() function to the given context', function () {
    var asset = runMiddlewareAndGetAsset();
    expect(asset).not.toBeUndefined();
  });
  
  describe('asset()', function () {
    var file;
    
    beforeEach(function () {
      file = 'assemble-asset-middleware.spec.js';
      fs.writeFileSync(path.join(os.tmpdir(), file), fs.readFileSync(path.resolve(__filename)));
    });
    
    it('should return a file with the same extention', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFilename = asset(file);
      expect(path.extname(assetFilename)).toEqual('.js');
    });
    
    it('should return a filename prefix with the assets path', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFilename = asset(file);
      //console.log('######',assetFilename);
      expect(assetFilename.indexOf('/path/to/assets/')).toEqual(0);
    });
    
    it('should create the hashed file if that does not exists', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFileName = asset(file);
      var baseName = path.basename(assetFileName);
      expect(fs.existsSync(path.join(os.tmpdir(), baseName))).toEqual(true);
    });
  });
  
});
