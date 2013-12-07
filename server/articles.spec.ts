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

  });

  describe('Article', () => {
    var content = '---\n' +
      'title: Some thoughts on Dart language\n' +
      'date: 2013-12-01 19:04\n' +
      'tags:\n' +
      '- dartlang\n' +
      '- dart\n' +
      '---',
      article: articles.Article;

    beforeEach(() => {
      article = new articles.Article(content);
    });

    it('should provide the title extracted from the metadata', () => {
      expect(article.title()).to.equal('Some thoughts on Dart language');
    });

    it('should provide the date extracted from the metadata', () => {
      expect(article.date()).to.equal('2013-12-01 19:04');
    });

    it('should provide an array of tags extracted from the metadata', () => {
      expect(article.tags()).to.eql(['dartlang', 'dart']);
    });
  });
});
