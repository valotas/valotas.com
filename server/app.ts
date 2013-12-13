///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />

import express = require('express')
import path = require('path')
import cons = require('consolidate')
import articles = require('articles')
import os = require('os')

var less = require('less-middleware'),
  contents = path.normalize(__dirname + '/../contents'),
  templates = path.normalize(__dirname + '/../templates'),
  tmpDir = os.tmpDir() + '/valotas.com',
  app = express();

app
  //Add a view engine
  .engine('jade', cons.jade)
  .set('view engine', 'jade')
  .set('views', templates)

  .use(express.logger())

  //Add less support to our server
  .use(less({ 
    src: contents,
    dest: tmpDir,
    optimization: 2,
    compress: true
  }))

  // Server static content
  .use(express.static(contents))
  .use(express.static(tmpDir))

  // Add an article handler:
  .use(articles.middleware)
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

