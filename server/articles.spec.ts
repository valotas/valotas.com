///<reference path='../d.ts/DefinitelyTyped/mocha/mocha.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/chai/chai.d.ts' />

import articles = require('articles')
var expect = require('chai').expect;

describe('articles', () => {

  describe('Article', () => {
    var content = '---\n' +
      'title: Some thoughts on Dart language\n' +
      'date: 2013-12-01 19:04\n' +
      'tags:\n' +
      '- dartlang\n' +
      '- dart\n' +
      '---\n' + 
      'super content!\n' + 
      '## li la lo',
      article: articles.Article;

    beforeEach(() => {
      article = new articles.Article(content, 'testtt');
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
      expect(article.content()).to.equal('<p>super content!</p>\n<h2 id="li-la-lo">li la lo</h2>\n');
    });

    it('should return a url of /[name]', () => {
      var article = new articles.Article(content, 'xxx');
      expect(article.url()).to.equal('/xxx/');
    });

    it('should return the first lines up to the first h2 with the intro function', () => {
      expect(article.intro).not.to.be.undefined;
      expect(article.intro()).to.equal('<p>super content!</p>\n');
    })
  });

  describe('ArticleFile', () => {
    it('should be initialized with a basename and a name', () => {
      var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest.md');
      expect(f).not.to.be.null;
    });

    it('should return an article if the file with the given name exists', () => {
      var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest.md');
      expect(f.article()).not.to.be.null;
    });

    it('should return null if no file with the given name exists', () => {
      var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest.m');
      expect(f.article()).to.be.null;
    });

    it('should return an article if the file with name [name].md exists', () => {
      var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest');
      expect(f.article()).not.to.be.null;
    });

    it('should return an article if the file with name [name]/index.md exists', () => {
      var f = new articles.ArticleFile(__dirname + '/..', 'dartlang');
      expect(f.article()).not.to.be.null;
    });
  });

  describe('ArticleRepository', () => {
    var repo = new articles.ArticleRepository(__dirname + '/..');

    it('should provide a getter for a simple article', () => {
      expect(repo.get).not.to.be.undefined
    });

    it('should return an article when it exists', () => {
      var article = repo.get({title: 'dartlang'});
      expect(article).not.to.be.null;
    });

    it('should return null when article does not exists', () => {
      var article = repo.get({title: 'dartlangg'});
      expect(article).to.be.null;
    });

    it('should return null if the given year/month does not match the article\'s one', () => {
      var article = repo.get({title: 'dartlang', year: 2012, month: 12});
      expect(article).to.be.null;
    });

    it('should return an article if both year and month are matching with the article\'s meta when given', () => {
      var article = repo.get({year: 2013, month: 12, title: 'dartlang'});
      expect(article).not.to.be.null;
    });

    it('should provide a way to list all Articles', () => {
      expect(repo.all).not.to.be.undefined;
    });

    it('should return all articles with list', () => {
      var articles = repo.all();
      expect(articles).not.to.be.null;
      expect(articles.length).to.be.at.above(5);
      expect(articles.length).to.be.at.below(20);
    });

    it('should return articles sorted by date', () => {
      var last: articles.Article;
      repo.all().forEach((a: articles.Article) => {
        if (last != null) {
          expect(a.moment().isBefore(last.moment())).to.be.true;
        }
        last = a;
      });
    });
  });

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

    it('should accept the year and month as strings or numbers', () => {
      var url = new articles.ArticleUrlParams({year: '2013', month: 12, title: 'dartlang'});
      expect(url.year).to.equal(2013);
    });


    it('should throw an error when trying to create with a year and no month', () => {
      expect(() => {
        new articles.ArticleUrlParams({year: '44', title: 'dartlang'});
      }).to.throw(/Month is mandatory when year is given/);
    });


    it('should throw an error when trying to create with a month and no year', () => {
      expect(() => {
        new articles.ArticleUrlParams({month: '44', title: 'dartlang'});
      }).to.throw(/Year is mandatory when month is given/);
    });
  });

});
