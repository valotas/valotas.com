///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/moment/moment.d.ts' />

import fs = require('fs')
import path = require('path')
import yalm = require('js-yaml')
var moment = require('moment');

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
    this._month = param.month || null;
    this._year = param.year || null;
    this._title = param.title || null;

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
    var p = this.mdPathIfExists(basePath);
    if (p == null) {
      return null;
    }

    return new Article(p);
  }
}

class ArticleParseException implements Error {
  public name = 'ArticleParseException';
  constructor(public message: string) {

  }
}

export class Article {
  private meta;

  constructor(public content: string) {
    var lines = content.split('\n'),
      header;

    for (var i in lines) {
      var line = lines[i];
      if (line === '---') {
        if (header) {
          break;
        } else {
          header = '';
        }
      } else {
        header += line + '\n';
      }
    }

    this.meta = yalm.load(header);
    if (this.meta === null) {
      throw new ArticleParseException("Can not extract meta info out of '" + header + "'" );
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
}

import express = require('express')

var app = express();

app.get('/:year/:month/:title', (req: express.Request, resp: express.Response, next?: Function) => {
  try {
    var params = new ArticleUrlParams(req.params);

  } catch (e) {
    next(e);
  }
  if (req.params.year && req.params.month && req.params.title) {
    resp.send('Articles here!');
  } else {
    console.log('Could not serve article')
    next();
  }
});

export var expressApp = app;
