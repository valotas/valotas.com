///<reference path='../d.ts/DefinitelyTyped/express/express.d.ts' />

import express = require('express')

export interface SiteMapEntry {
  url: string;
  title?: string;
}

export class SiteMapService {

  homepage(): SiteMapEntry {
    return {
      url: '/',
      title: 'Home'
    }
  }
}

var sitemap = new SiteMapService();

export var middleware = (req: express.Request, resp: express.Response, next?: Function) => {
  resp.locals.sitemap = sitemap;
  next();
}
