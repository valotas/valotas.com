///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='less.d.ts' />

import express = require('express')
import less = require('less-middleware')
import path = require('path')

var contents = path.normalize(__dirname + '/../contents'),
  app = express();

app
  .use(function (req: express.Request, resp: express.Response, next?: Function) {
    console.log('%s %s %s', contents, req.method, req.originalUrl);
    next();
  })
  .use(less({ src: contents }))
  .use(express.static(contents))
  .get('/', function (req: express.Request, resp: express.Response) {
    var body = 'Hello man!';
    resp.contentType('text/plain')
      .header('Content-Length', '' + body.length)
      .end(body);
  })
  .listen(8080, function () {
    console.log('Listening on 8080');
  });

export var App = app;
