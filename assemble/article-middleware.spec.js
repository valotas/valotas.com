/*jshint node:true*/
/*globals describe, it, expect, beforeEach*/

'use strict';

var middleware = require('./article-middleware');

function noop() {}

function runMiddlewareAndGetContext() {
  var params = {
    stage: 'render:pre:page',
    context: {
      page: {}
    }
  };
  middleware(params, noop);
  return params.context;
}

describe('article-middleware', function () {

  it('should add an article property to the given page', function () {
    var ctx = runMiddlewareAndGetContext({});
    expect(ctx.article).not.toBeUndefined();
  });

  describe('Article', function () {
    var ctx;

    beforeEach(function () {
      ctx = runMiddlewareAndGetContext({});
    });

    it('should provide a function to get the published date', function () {
      expect(ctx.article.date).not.toBeUndefined();
      ctx.page.data = {
        date: '22 Aug 2013'
      };
      expect(ctx.article.date()).toEqual('22/08/2013');
    });

    it('should allow to get the published date formated', function () {
      ctx.page.data = {
        date: '22 Aug 2013'
      };
      expect(ctx.article.date('YY-MM-DD')).toEqual('13-08-22');
    });

    it('should have html function delegating to page.html', function () {
      expect(ctx.article.html()).toEqual('');
    });

    describe('Article.description', function () {
      it('should return the page\'s object description if available', function () {
        ctx.page.description = 'some description';
        expect(ctx.article.description()).toEqual(ctx.page.description);
      });

      it('should return the first paragraph of the page.html() content if no description is available', function () {
        ctx.page.html = function () {
          return '123456789 123456789<h2 id="someid">asd.....';
        };
        expect(ctx.article.description()).toEqual('123456789 123456789');
      });
      
      it('should return the the first letter within a span.first-letter', function () {
        ctx.page.html = function () {
          return '<p>123</p>';
        };
        expect(ctx.article.html()).toEqual('<p><span class="first-letter">1</span>23');
      });
    });

  });
});
