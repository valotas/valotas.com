///<reference path='../d.ts/DefinitelyTyped/mocha/mocha.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/chai/chai.d.ts' />

import articles = require('articles')
var expect = require('chai').expect;

describe('articles', () => {
  describe('ArticleUrlParam', () => {

    it('should throw an error when trying to construct it without paramters', () => {
      expect(() => {
        new articles.ArticleUrlParams(null);
      }).to.throw(/null parameter object/)
    });

    it('should throw an error when trying to construct it without a title', () => {
      expect(() => {
        new articles.ArticleUrlParams({year:'123', month: '123'});
      }).to.throw(/Title can not be null/)
    });

    it('should give the expected path based on the given title', () => {
      var p = new articles.ArticleUrlParams({title: 'xxx'});
      expect(p.path()).to.match(/contents\/articles\/xxx\/index\.md/);
    });

  })
});
