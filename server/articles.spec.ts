///<reference path='../d.ts/DefinitelyTyped/mocha/mocha.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/chai/chai.d.ts' />

import articles = require('articles')
var expect = require('chai').expect;

describe('articles', () => {
  describe('ArticleUrlParam', () => {

    it('should throw an error when trying to construct it without paramters', () => {
      expect(() => {
        new articles.ArticleUrlParams(null);
      }).to.throw(/undefined parameters/)
    });

    it('should throw an error when trying to construct it without a title', () => {
      expect(() => {
        new articles.ArticleUrlParams({year:'123', month: '123'});
      }).to.throw(/Title can not be null/)
    });

    it('should return null if there is no file coresponding to the given title', () => {
      var url = new articles.ArticleUrlParams({title: 'xxx'});
      expect(url.article('.')).to.be.null;
    });

    it('should return an article if there is a file named as [title].md', () => {
      var url = new articles.ArticleUrlParams({title: 'quicker-jerseytest'});
      expect(url.article(__dirname + '/..')).not.to.be.null;
    });

    it('should return an article if there is a file named as [title]/index.md', () => {
      var url = new articles.ArticleUrlParams({title: 'dartlang'});
      expect(url.article(__dirname + '/..')).not.to.be.null;
    });
  });

  describe('Article', () => {
    var content = '---\n' +
      'title: Some thoughts on Dart language\n' +
      'date: 2013-12-01 19:04\n' +
      'tags:\n' +
      '- dartlang\n' +
      '- dart\n' +
      '---\n' + 
      'super content!',
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

    it('should provide a way to get the date formated', () => {
      expect(article.date('YYYY-MM-DD')).to.equal('2013-12-01');
    });

    it('should provide an array of tags extracted from the metadata', () => {
      expect(article.tags()).to.eql(['dartlang', 'dart']);
    });

    it('should provide the content without the header', () => {
      expect(article.content()).to.equal('<p>super content!</p>\n');
    });
  });
});
