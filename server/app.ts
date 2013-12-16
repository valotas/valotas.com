///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/consolidate.d.ts' />

import express = require('express')
import path = require('path')
import cons = require('consolidate')
import os = require('os')

import articles = require('articles')
import sitemap = require('sitemap')

var less = require('less-middleware'),
  conf = require('../config.json'),
  contents = path.normalize(__dirname + '/../contents'),
  templates = path.normalize(__dirname + '/../templates'),
  tmpDir = os.tmpDir() + '/valotas.com',
  app = express();

app
  //Add a view engine
  .engine('jade', cons.jade)
  .set('view engine', 'jade')
  .set('views', templates)

  .configure(function () {
    app.locals.pretty = true;
  })

  .use(express.logger())

  //Add less support to our server
  .use(less({ 
    src: contents,
    dest: tmpDir,
    optimization: 2,
    compress: true,
    force: true, //always re-compile
    debug: true
  }))

  // Server static content
  .use(express.static(contents))
  .use(express.static(tmpDir))

  .use((req: express.Request, resp: express.Response, next?: Function) => {
    resp.locals = conf.locals;
    next();
  })

  .use(sitemap.middleware)

  // Add an article handler:
  .use(articles.middleware)
  .use(articles.router.middleware)

  //Add a simple handler for /
  .get('/', function (req: express.Request, resp: express.Response) {
    resp.render('index');
  })

  //Run the server on port 8080
  .listen(8080, function () {
    console.log('Listening on 8080');
  });

