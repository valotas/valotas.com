///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/moment/moment.d.ts' />

import fs = require('fs')
import path = require('path')
import yalm = require('js-yaml')
var moment = require('moment');
var marked = require('marked');

class ArticleUrlCreationException implements Error {
  public name = 'ArticleUrlCreationException';
  constructor(public message: string) {

  }
}

export class ArticleUrlParams {
  private _title: string;
  private _year: number;
  private _month: number;
  private _dir: string;

  constructor(param: any) {
    if (!(param)) {
      throw new ArticleUrlCreationException('Can not work with an undefined parameters');
    }

    this._month = parseInt(param.month, 10) || null;
    this._year = parseInt(param.year, 10) || null;
    this._title = param.title || null;

    if (this._month !== null && this._year === null) {
      throw new ArticleUrlCreationException('Year is mandatory when month is given')
    }

    if (this._year !== null && this._month === null) {
      throw new ArticleUrlCreationException('Month is mandatory when year is given')
    }

    if (this._title == null) {
      throw new ArticleUrlCreationException('Title can not be null');
    }
  }

  private mdPathIfExists(basePath: string):string {
    var md = basePath + '/contents/articles/' + this._title;

    if (fs.existsSync(md)) { //it should be a directory
      md += '/index.md';
    } else {
      md += '.md';
    }

    return fs.existsSync(md) ? path.normalize(md) : null;
  }

  article(basePath: string): Article {
    var p = this.mdPathIfExists(basePath),
      a, m;
    if (p == null) {
      return null;
    }

    a = new Article(fs.readFileSync(p, {
      encoding: 'UTF8'
    }));

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
  }
}

class ArticleParseException implements Error {
  public name = 'ArticleParseException';
  constructor(public message: string) {

  }
}

export class Article {
  private meta;
  private contentWithoutHeader: string;

  constructor(content: string) {
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

  private moment(): Moment {
    return moment(this.meta.date);
  }

  tags(): string[] {
    return this.meta.tags;
  }

  content(): string {
    return marked(this.contentWithoutHeader);
  }
}

import express = require('express')

var router = new express.Router();

router.get('/:year/:month/:title', (req: express.Request, resp: express.Response, next?: Function) => {
  try {
    var params = new ArticleUrlParams(req.params),
      article = params.article(__dirname + '/..');

    if (article === null) {
      next();
    }
    else {
      resp.render('article', {
        page: article, 
        contents: {
          index: { url: 'xxx' }
        }});
    }
  } catch (e) {
    next(e);
  }
});

export var router = router;
