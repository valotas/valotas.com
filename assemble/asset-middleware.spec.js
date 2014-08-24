/*jshint node:true*/
/*globals describe, it, expect*/

'use strict';

var middleware = require('./asset-middleware');

describe('asset-middleware', function () {
  it('should fail for the moment', function () {
    expect(middleware).toEqual(null);
  });
});
