///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='less.d.ts' />

import express = require('express')
import less = require('less-middleware')
import path = require('path')
import articles = require('articles')

var contents = path.normalize(__dirname + '/../contents'),
  app = express();

app
//  .use(function (req: express.Request, resp: express.Response, next?: Function) {
//    console.log('%s %s %s', contents, req.method, req.originalUrl);
//    next();
//  })

  .use(express.logger())

  //Add less support to our server
  .use(less({ src: contents }))

  // Server static content
  .use(express.static(contents))

  // Add an article handler:
  .use(articles)

  //Add a simple handler for /
  .get('/', function (req: express.Request, resp: express.Response) {
    var body = 'Hello man!';
    resp.contentType('text/plain')
      .header('Content-Length', '' + body.length)
      .end(body);
  })

  //Run the server on port 8080
  .listen(8080, function () {
    console.log('Listening on 8080');
  });

