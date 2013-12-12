///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/moment/moment.d.ts' />
var fs = require('fs');
var path = require('path');
var yalm = require('js-yaml');
var moment = require('moment');
var marked = require('marked');

var ArticleParseException = (function () {
    function ArticleParseException(message) {
        this.message = message;
        this.name = 'ArticleParseException';
    }
    return ArticleParseException;
})();

var Article = (function () {
    function Article(content) {
        var splitted = content.split(/---\n/), i = 2;

        if (splitted.length === 0) {
            throw new ArticleParseException('Could not find the header of the content');
        }

        this.meta = yalm.load(splitted[1]);

        if (this.meta === null) {
            throw new ArticleParseException("Can not extract meta info out of '" + splitted[1] + "'");
        }

        this.contentWithoutHeader = splitted[2];
        for (i = 3; i < splitted.length; i++) {
            this.contentWithoutHeader += '---\n' + splitted[i];
        }
    }
    Article.prototype.title = function () {
        return this.meta['title'];
    };

    Article.prototype.date = function (format) {
        if (typeof format === "undefined") { format = 'YYYY-MM-DD HH:mm'; }
        return this.moment().format(format);
    };

    Article.prototype.moment = function () {
        return moment(this.meta.date);
    };

    Article.prototype.tags = function () {
        return this.meta.tags;
    };

    Article.prototype.content = function () {
        return marked(this.contentWithoutHeader);
    };
    return Article;
})();
exports.Article = Article;

var ArticleFile = (function () {
    function ArticleFile(basePath, name) {
        this.basePath = path.normalize(basePath);
        this.ext = path.extname(name) || '.md';
        this.name = path.basename(name, this.ext);
    }
    ArticleFile.prototype.mdPathIfExists = function () {
        var md = this.basePath + '/contents/articles/' + this.name;

        if (fs.existsSync(md)) {
            md += '/index.md';
        } else {
            md += this.ext;
        }

        return fs.existsSync(md) ? path.normalize(md) : null;
    };

    ArticleFile.prototype.article = function () {
        var p = this.mdPathIfExists(), a, m;

        if (p == null) {
            return null;
        }

        a = new Article(fs.readFileSync(p, {
            encoding: 'UTF8'
        }).toString());

        return a;
    };
    return ArticleFile;
})();
exports.ArticleFile = ArticleFile;

var ArticleUrlCreationException = (function () {
    function ArticleUrlCreationException(message) {
        this.message = message;
        this.name = 'ArticleUrlCreationException';
    }
    return ArticleUrlCreationException;
})();

var ArticleUrlParams = (function () {
    function ArticleUrlParams(param) {
        if (!(param)) {
            throw new ArticleUrlCreationException('Can not work with an undefined parameters');
        }

        this._month = parseInt(param.month, 10) || null;
        this._year = parseInt(param.year, 10) || null;
        this._title = param.title || null;

        if (this._month !== null && this._year === null) {
            throw new ArticleUrlCreationException('Year is mandatory when month is given');
        }

        if (this._year !== null && this._month === null) {
            throw new ArticleUrlCreationException('Month is mandatory when year is given');
        }

        if (this._title == null) {
            throw new ArticleUrlCreationException('Title can not be null');
        }
    }
    ArticleUrlParams.prototype.article = function (basePath) {
        var f = new ArticleFile(basePath, this._title), a = f.article(), m;

        if (a == null) {
            return null;
        }

        if (this._year !== null) {
            m = a.moment();
            if (this._year !== m.year()) {
                return null;
            }
            if (this._month !== m.month() + 1) {
                return null;
            }
        }

        return a;
    };
    return ArticleUrlParams;
})();
exports.ArticleUrlParams = ArticleUrlParams;

var getArticleFiles = function (directory, files) {
    if (typeof files === "undefined") { files = []; }
    var filenames = fs.readdirSync(directory);
    for (var i in filenames) {
        if (!filenames.hasOwnProperty(i))
            continue;
        var f = directory + '/' + filenames[i];
        if (fs.statSync(f).isDirectory()) {
            getArticleFiles(f, files);
        } else {
            files.push(f);
        }
    }
    return files;
};

var ArticleList = (function () {
    function ArticleList(directory) {
        this.files = getArticleFiles(directory);
    }
    ArticleList.prototype.size = function () {
        return this.files.length;
    };
    return ArticleList;
})();
exports.ArticleList = ArticleList;

var express = require('express');

var handler = function (req, resp, next) {
    try  {
        var params = new ArticleUrlParams(req.params), article = params.article(__dirname + '/..');

        if (article === null) {
            next();
        } else {
            resp.locals.title = 'XXX';
            resp.locals.contents = {
                index: { url: 'xxx' }
            };
            resp.render('article', { page: article });
        }
    } catch (e) {
        next(e);
    }
};

exports.router = new express.Router().get('/:year/:month/:title', handler).get('/:title', handler);
