/*jshint node:true*/
/*globals describe, it, expect*/

'use strict';

var middleware = require('./links-middleware');

describe('links-middleware', function () {
  it('should decorate a page with a link function', function () {
    var p = { dirname: 'build/to/some/path' };
    middleware(p);
    expect(p.link).not.toBeUndefined();
  });

  describe('link()', function () {
    it('should return it\'s link when called with no arguments', function () {
      var p = { dirname: 'build/to/some/path' };
      middleware(p);
      expect(p.link()).toEqual('to/some/path/');
    });

    it('should return the relative path to the given argument', function () {
      var p = { dirname: 'build/to/some/path' };
      middleware(p);
      expect(p.link('to/other/path')).toEqual('../../other/path');
    });

    it('should fix the first / of the given argument', function () {
      var p = { dirname: 'build/to/some/path' };
      middleware(p);
      expect(p.link('/to/other/path')).toEqual('../../other/path');
    });
  });
});
