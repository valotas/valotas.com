/* eslint-env node */

const { Transformer } = require("@parcel/plugin");
const path = require("path");
const { parse } = require("@valotas/valotas.com-frontent");
const { parseRobots } = require("./robots");
const { parseSitemap } = require("./sitemap");
const { sortByDate } = require("./date-sorter");

/** @type {import("@parcel/types").SpecifierType} */
const specifierType = "commonjs";

/** @type {import("@parcel/types").DependencyPriority} */
const priority = "parallel";

/**
 * Creates a dependency object for the given specifier
 *
 * @param {string} specifier
 * @returns a dependency that can be added to an asset
 */
function createDependency(specifier) {
  return {
    specifier,
    specifierType,
    needsStableName: true,
    priority,
  };
}

/**
 * Parses the given path
 *
 * @param {import("@parcel/fs").FileSystem} fs
 * @param {string} filePath
 */
async function parseMD(fs, filePath) {
  if (path.extname(filePath) !== ".md") {
    return null;
  }
  const buffer = await fs.readFile(filePath);
  const raw = buffer.toString("utf8");
  return parse(raw);
}

/**
 *
 * @param {{ options: import("@parcel/types").PluginOptions, asset: import("@parcel/types").MutableAsset }} param
 */
async function handleSitemap({ asset, options }) {
  const sitemap = await parseSitemap(asset, options.inputFS);

  /** @type {Array<ReturnType<typeof import("@valotas/valotas.com-frontent").parse> & { key: string }>} */
  const mdFiles = [];

  for (let dep of sitemap.getDependencies()) {
    const md = await parseMD(options.inputFS, dep.filePath);

    if (md?.draft) {
      continue;
    }

    if (md) {
      mdFiles.push({ ...md, key: dep.key });
    }

    asset.addDependency(createDependency(dep.specifier));
  }

  asset.setCode(sitemap.getCode());

  return [
    asset,
    {
      type: "md",
      uniqueKey: "index",
      content: "",
      meta: {
        key: "index",
        publishedFiles: sortByDate(mdFiles),
      },
    },
  ];
}

/**
 *
 * @param {{ asset: import("@parcel/types").MutableAsset }} param
 */
async function handleRobots({ asset }) {
  const robotsContent = await asset.getCode();
  const robots = parseRobots(robotsContent);

  const sitemap = robots.getSitemap();
  if (sitemap) {
    asset.addDependency(createDependency(sitemap));
  }
  robots.setSitemap("/sitemap.txt");

  asset.setCode(robots.getCode());

  return [asset];
}

exports.default = new Transformer({
  async transform(props) {
    const { asset } = props;

    if (asset.type === "meta") {
      return [asset];
    }

    const base = path.parse(asset.filePath).base;

    let assets = [];

    if (base == "robots.txt") {
      assets = await handleRobots(props);
    }

    if (base == "sitemap.txt") {
      assets = await handleSitemap(props);
    }

    return assets;
  },
});
