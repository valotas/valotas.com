///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/moment/moment.d.ts' />
///<reference path='../d.ts/js-yaml.d.ts' />

import fs = require('fs')
import path = require('path')
import yalm = require('js-yaml')
var moment = require('moment');
var marked = require('marked');


class ArticleParseException implements Error {
  public name = 'ArticleParseException';
  constructor(public message: string) {

  }
}

class ArticleUrlCreationException implements Error {
  public name = 'ArticleUrlCreationException';
  constructor(public message: string) {

  }
}

export class Article {
  private meta;
  private contentWithoutHeader: string;

  constructor(content: string, private name: string) {
    var splitted = content.split(/---\n/),
      i = 2;

    if (splitted.length === 0) {
      throw new ArticleParseException('Could not find the header of the content');
    }

    this.meta = yalm.load(splitted[1]);

    if (this.meta === null) {
      throw new ArticleParseException("Can not extract meta info out of '" + splitted[1] + "'" );
    }

    this.contentWithoutHeader = splitted[2];
    for (i = 3; i < splitted.length; i++) {
      this.contentWithoutHeader += '---\n' + splitted[i];
    }
  }

  title(): string {
    return this.meta['title'];
  }

  date(format: string = 'YYYY-MM-DD HH:mm'): string {
    return this.moment().format(format);
  }

  moment(): Moment {
    return moment(this.meta.date);
  }

  tags(): string[] {
    return this.meta.tags;
  }

  content(): string {
    return marked(this.contentWithoutHeader);
  }

  intro(): string {
    return marked(this.contentWithoutHeader
        .substring(0, this.contentWithoutHeader.indexOf('##')));
  }

  url(): string {
    return '/' + this.name + '/';
  }
}

export class ArticleFile {
  private basePath: string;
  private name: string;
  private ext: string;

  constructor(basePath: string, name: string) {
      this.basePath = path.normalize(basePath);
      this.ext = path.extname(name) || '.md';
      this.name = path.basename(name, this.ext);
  }

  private mdPathIfExists():string {
    var md = this.basePath + '/contents/articles/' + this.name;

    if (fs.existsSync(md)) { //it should be a directory
      md += '/index.md';
    } else {
      md += this.ext;
    }

    return fs.existsSync(md) ? md : null;
  }

  article(): Article {
    var p = this.mdPathIfExists(),
      a, m;

    if (p == null) {
      return null;
    }

    a = new Article(fs.readFileSync(p, {
      encoding: 'UTF8'
    }).toString(), this.name);

    return a;
  }
}

export interface ArticleQuery {
  title: string;
  year?: number;
  month?: number;
}

export class ArticleRepository {
  private articles: Article[];
  private directory: string;

  constructor(directory: string) {
    this.directory = path.normalize(directory);
  }

  get(q: ArticleQuery): Article {
    var f = new ArticleFile(this.directory, q.title),
      a = f.article(),
      m: Moment;

    if (a == null) {
      return null;
    }

    if (q.year) {
      m = a.moment();
      if (q.year !== m.year()) {
        return null;
      }
      if (q.month !== m.month() + 1) {
        return null;
      }
    }

    return a;
  }

  private getArticleFiles = (): ArticleFile[] => {
    var files: ArticleFile[] = [],
      filenames = fs.readdirSync(this.directory + '/contents/articles');

    for (var i in filenames) {
      if (!filenames.hasOwnProperty(i)) continue;
      files.push(new ArticleFile(this.directory, filenames[i]));
    }

    return files;
  }

  private getArticles = (): Article[] => {
    var files = this.getArticleFiles(),
      articles = [], i;
    for (i in files) {
      articles.push(files[i].article())
    }
    return articles;
  }

  all(): Article[] {
    if (!(this.articles)) {
      this.articles = this
        .getArticles()
        .sort((a: Article, b: Article): number => {
          var ma = a.moment(),
            mb = b.moment();
          if (ma.isSame(mb)) {
            return 0;
          }
          if (ma.isAfter(mb)) {
            return -1;
          }
          return 1;
        });
    }
    return this.articles;
  }
}

export class ArticleUrlParams implements ArticleQuery {
  title: string;
  year: number;
  month: number;

  constructor(param: any) {
    if (!(param)) {
      throw new ArticleUrlCreationException('Can not work with an undefined parameters');
    }

    this.month = parseInt(param.month, 10) || null;
    this.year = parseInt(param.year, 10) || null;
    this.title = param.title || null;

    if (this.month !== null && this.year === null) {
      throw new ArticleUrlCreationException('Year is mandatory when month is given')
    }

    if (this.year !== null && this.month === null) {
      throw new ArticleUrlCreationException('Month is mandatory when year is given')
    }

    if (this.title == null) {
      throw new ArticleUrlCreationException('Title can not be null');
    }
  }
}

import express = require('express')

export var repo = new ArticleRepository(__dirname + '/..'),
  handler = (req: express.Request, resp: express.Response, next?: Function) => {
    try {
      var params = new ArticleUrlParams(req.params),
        article = repo.get(params);

      if (article === null) {
        next();
      }
      else {
        resp.locals.article = article;
        resp.locals.page = article;
        resp.render('article');
      }
    } catch (e) {
      next(e);
    }
  };

export var middleware = (req: express.Request, resp: express.Response, next?: Function) => {
  resp.locals.articles = repo;
  next();
}

export var router = new express.Router()
  .get('/:year/:month/:title/', handler)
  .get('/:title/', handler)
  .get('/archive/', (req: express.Request, resp: express.Response, next?: Function) => {
    resp.render('archive');
  });
