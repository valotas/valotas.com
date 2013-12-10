///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />

import express = require('express')
import less = require('less-middleware')
import path = require('path')
import cons = require('consolidate')
import articles = require('articles')

var contents = path.normalize(__dirname + '/../contents'),
  templates = path.normalize(__dirname + '/../templates'),
  app = express();

app
  //Add a view engine
  .engine('jade', cons.jade)
  .set('view engine', 'jade')
  .set('views', templates)

  .use(express.logger())

  //Add less support to our server
  .use(less({ src: contents }))

  // Server static content
  .use(express.static(contents))

  // Add an article handler:
  .use(articles.router.middleware)

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

