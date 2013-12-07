///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />

class ArticleUrlParam {
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
    return 'asd';
  }
}

import express = require('express')

var app = express();

app.get('/:year/:month/:title', (req: express.Request, resp: express.Response, next?: Function) => {
  if (req.params.year && req.params.month && req.params.title) {
    resp.send('Articles here!');
  } else {
    console.log('Could not serve article')
    next();
  }
});

export = app;
