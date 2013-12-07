///<reference path='../d.ts/DefinitelyTyped/mocha/mocha.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/chai/chai.d.ts' />

import articles = require('articles')
var expect = require('chai').expect;

describe('articles', () => {
  describe('ArticleUrlParam', () => {
    it('should throw an error when trying to construct it without paramters', () => {
      expect(() => {
        new articles.ArticleUrlParams(null);
      }).to.throw(/Can not work with a null paramter object/)
    });
  })
});
