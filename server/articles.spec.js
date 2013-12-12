///<reference path='../d.ts/DefinitelyTyped/mocha/mocha.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/chai/chai.d.ts' />
var articles = require('articles');
var expect = require('chai').expect;

describe('articles', function () {
    describe('Article', function () {
        var content = '---\n' + 'title: Some thoughts on Dart language\n' + 'date: 2013-12-01 19:04\n' + 'tags:\n' + '- dartlang\n' + '- dart\n' + '---\n' + 'super content!', article;

        beforeEach(function () {
            article = new articles.Article(content);
        });

        it('should provide the title extracted from the metadata', function () {
            expect(article.title()).to.equal('Some thoughts on Dart language');
        });

        it('should provide the date extracted from the metadata', function () {
            expect(article.date()).to.equal('2013-12-01 19:04');
        });

        it('should provide a way to get the date formated', function () {
            expect(article.date('YYYY-MM-DD')).to.equal('2013-12-01');
        });

        it('should provide an array of tags extracted from the metadata', function () {
            expect(article.tags()).to.eql(['dartlang', 'dart']);
        });

        it('should provide the content without the header', function () {
            expect(article.content()).to.equal('<p>super content!</p>\n');
        });
    });

    describe('ArticleFile', function () {
        it('should be initialized with a basename and a name', function () {
            var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest.md');
            expect(f).not.to.be.null;
        });

        it('should return an article if the file with the given name exists', function () {
            var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest.md');
            expect(f.article()).not.to.be.null;
        });

        it('should return null if no file with the given name exists', function () {
            var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest.m');
            expect(f.article()).to.be.null;
        });

        it('should return an article if the file with name [name].md exists', function () {
            var f = new articles.ArticleFile(__dirname + '/..', 'quicker-jerseytest');
            expect(f.article()).not.to.be.null;
        });

        it('should return an article if the file with name [name]/index.md exists', function () {
            var f = new articles.ArticleFile(__dirname + '/..', 'dartlang');
            expect(f.article()).not.to.be.null;
        });
    });

    describe('ArticleUrlParam', function () {
        it('should throw an error when trying to construct it without paramters', function () {
            expect(function () {
                new articles.ArticleUrlParams(null);
            }).to.throw(/undefined parameters/);
        });

        it('should throw an error when trying to construct it without a title', function () {
            expect(function () {
                new articles.ArticleUrlParams({ year: '123', month: '123' });
            }).to.throw(/Title can not be null/);
        });

        it('should return null if there is no file coresponding to the given title', function () {
            var url = new articles.ArticleUrlParams({ title: 'xxx' });
            expect(url.article('.')).to.be.null;
        });

        it('should return an article if there is a file named as [title].md', function () {
            var url = new articles.ArticleUrlParams({ title: 'quicker-jerseytest' });
            expect(url.article(__dirname + '/..')).not.to.be.null;
        });

        it('should return an article if there is a file named as [title]/index.md', function () {
            var url = new articles.ArticleUrlParams({ title: 'dartlang' });
            expect(url.article(__dirname + '/..')).not.to.be.null;
        });

        it('should return an article if both year and month are matching with the article\'s meta when given', function () {
            var url = new articles.ArticleUrlParams({ year: 2013, month: 12, title: 'dartlang' });
            expect(url.article(__dirname + '/..')).not.to.be.null;
        });

        it('should accept the year and month as strings or numbers', function () {
            var url = new articles.ArticleUrlParams({ year: '2013', month: 12, title: 'dartlang' });
            expect(url.article(__dirname + '/..')).not.to.be.null;
        });

        it('should return null if the given year/month does not match the article\'s one', function () {
            var p = new articles.ArticleUrlParams({ year: 2012, month: 12, title: 'dartlang' });

            expect(p.article(__dirname + '/..')).to.be.null;
        });

        it('should throw an error when trying to create with a year and no month', function () {
            expect(function () {
                new articles.ArticleUrlParams({ year: '44', title: 'dartlang' });
            }).to.throw(/Month is mandatory when year is given/);
        });

        it('should throw an error when trying to create with a month and no year', function () {
            expect(function () {
                new articles.ArticleUrlParams({ month: '44', title: 'dartlang' });
            }).to.throw(/Year is mandatory when month is given/);
        });
    });

    describe('ArticleList', function () {
        it('should be initialized with a directory', function () {
            expect(new articles.ArticleList(__dirname)).not.to.be.null;
        });

        it('should provide the size of the articles', function () {
            expect(new articles.ArticleList(__dirname).size()).to.be.at.least(5);
        });
    });
});
