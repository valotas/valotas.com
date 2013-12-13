///<reference path='../d.ts/DefinitelyTyped/node/node.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/mocha/mocha.d.ts' />
///<reference path='../d.ts/DefinitelyTyped/chai/chai.d.ts' />

import sm = require('sitemap');
var expect = require('chai').expect;

describe('sitemap', () => {
  var sitemap = new sm.SiteMapService();

  describe('SiteMapService', () => {
    it('should have an homepage function', () => {
      var home = sitemap.homepage();
      expect(home).not.to.be.null;
      expect(home.url).to.equal('/');
    });
  });
});
