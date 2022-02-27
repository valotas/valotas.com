/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Transformer } = require("@parcel/plugin");
const path = require("path");
const { parseRobots } = require("./robots");
const { parseSitemap } = require("./sitemap");

function createDependendcy(specifier) {
  return {
    specifier,
    specifierType: "commonjs",
    needsStableName: true,
    priority: "parallel",
  };
}

exports.default = new Transformer({
  async transform(props) {
    const { asset } = props;
    const base = path.parse(asset.filePath).base;

    if (base == "robots.txt") {
      await this.handleRobots(props);
    }

    if (base == "sitemap.txt") {
      await this.handleSitemap(props);
    }

    return [asset];
  },

  async handleRobots({ asset }) {
    const robotsContent = await asset.getCode();
    const robots = parseRobots(robotsContent);

    const sitemap = robots.getSitemap();
    if (sitemap) {
      asset.addDependency(createDependendcy(sitemap));
    }
    robots.setSitemap("/sitemap.txt");

    asset.setCode(robots.getCode());
  },

  async handleSitemap({ asset, options }) {
    const sitemap = await parseSitemap(asset, options.inputFS);

    for (let dep of sitemap.getDependencies()) {
      asset.addDependency(createDependendcy(dep));
    }
  },
});
