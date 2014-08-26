/*jshint node:true*/
/*globals describe, it, expect*/

'use strict';

var path = require('path');
var middleware = require('./asset-middleware');

function noop() {}

function runMiddlewareAndGetAsset() {
  var params = {
    context: {}
  };
  middleware(params, noop);
  return params.context.asset;
}

describe('asset-middleware', function () {
  it('should add an apply function to the given context', function () {
    var asset = runMiddlewareAndGetAsset();
    expect(asset).not.toBeUndefined();
  });
  
  describe('asset function', function () {
    it('should return the md5 of the given file', function () {
      var asset = runMiddlewareAndGetAsset();
      expect(asset(path.resolve(__filename))).toEqual('asdkldjf');
    });
  });
  
});
