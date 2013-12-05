var express = require('express'),
  less = require('less-middleware'),
  path = require('path'),
  contents = path.normalize(__dirname + '/../contents'),
  app = express();

app
  .use(function (req, resp, next) {
    console.log('%s %s %s', contents, req.method, req.url);
    next();
  })
  .use(less({
    src: contents
  }))
  .use(express.static(contents))
  .get('/', function (req, resp) {
    var body = 'Hello man!';
    resp.setHeader('Content-Type', 'text/plain');
    resp.setHeader('Content-Length', body.length);
    resp.end(body);
  })
  .listen(8080, function () {
    console.log('Listening on 8080');
  });

