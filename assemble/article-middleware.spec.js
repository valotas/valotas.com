/*jshint node:true*/
/*globals describe, it, expect, beforeEach*/

'use strict';

var middleware = require('./article-middleware');

function noop() {}

function runMiddleware(page) {
  var params = {
    context: {
      page: page
    }
  };
  middleware(params, noop);
}

describe('article-middleware', function () {

  it('should add an article property to the given page', function () {
    var page = {};
    runMiddleware(page);
    expect(page.article).not.toBeUndefined();
  });

  describe('Article', function () {
    var page = {};

    beforeEach(function () {
      runMiddleware(page);
    });

    it('should provide a function to get the published date', function (){
      expect(page.article.date).not.toBeUndefined();
      page.date = '22 Aug 2013';
      expect(page.article.date()).toEqual('22/08/2013');
    });

    it('should allow to get the published date formated', function (){
      page.date = '22 Aug 2013';
      expect(page.article.date('YY-MM-DD')).toEqual('13-08-22');
    });
  });
});
