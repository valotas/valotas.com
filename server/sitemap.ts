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

export var middleware = (req: express.Request, resp: express.Response, next?: Function) => {
  resp.locals.sitemap = new SiteMapService();
  next();
}
