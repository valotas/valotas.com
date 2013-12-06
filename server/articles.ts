///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />

import express = require('express')

var app = express();

app.get('/articles', (req: express.Request, resp: express.Response) => {
  resp.send('Articles here!');
});

export = app;
