/*jshint node:true*/
/*globals describe, it, expect*/

'use strict';

var path = require('path');
var middleware = require('./asset-middleware');

function noop() {}

function runMiddlewareAndGetAsset() {
  var params = {
    context: {
      assets: '/path/to/assets'
    }
  };
  middleware(params, noop);
  return params.context.asset;
}

describe('asset-middleware', function () {
  it('should add an apply function to the given context', function () {
    var asset = runMiddlewareAndGetAsset();
    expect(asset).not.toBeUndefined();
  });
  
  describe('asset()', function () {
    it('should return a file with the same extention', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFilename = asset(path.resolve(__filename));
      expect(path.extname(assetFilename)).toEqual('.js');
    });
    
    it('should return a filename prefix with the assets path', function () {
      var asset = runMiddlewareAndGetAsset();
      var assetFilename = asset(path.resolve(__filename));
      expect(assetFilename.indexOf('/path/to/assets')).toEqual(0);
    });
  });
  
});
