///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />

import fs = require('fs')
import yalm = require('js-yaml')

export class ArticleUrlParams {
  private _title: string;
  private _year: number;
  private _month: number;

  constructor(param: any) {
    if (!(param)) {
      throw 'Can not work with a null parameter object'
    }
    this._month = param.month || null;
    this._year = param.year || null;
    this._title = param.title || null;

    if (this._title == null) {
      throw 'Title can not be null';
    }
  }

  path():string {
    return __dirname + '/contents/articles/' + this._title + '/index.md';
  }

  article(): Article {
    return new Article(this.path());
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
      throw {
        type: 'ArticleParseException',
        message: "Can not extract meta info out of '" + header + "'"
      };
    }
  }

  title(): string {
    return this.meta['title'];
  }

  date(format?: string): string {
    //TODO: Should return a moments instance
    return this.meta.date;
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
