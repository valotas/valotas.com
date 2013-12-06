///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />

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
