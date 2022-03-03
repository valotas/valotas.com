const { isGlob, glob, normalizeSeparators } = require("@parcel/utils");
const path = require("path");
const { computeKey } = require("@valotas/parcel-namer-staticsite");

class Sitemap {
  /**
   * Sitemap
   *
   * @param {string} baseDir
   * @param {Array<string>} rules
   */
  constructor(baseDir, rules) {
    /** @type {Array<string>} */
    this._rules = rules;
    this._baseDir = baseDir;
  }

  getDependencies() {
    return this._rules.map((r) => {
      const { name, ext } = computeKey(r);
      return {
        key: name,
        ext,
        filePath: r,
        specifier: r.replace(this._baseDir, "."),
      };
    });
  }

  getCode() {
    return this.getDependencies()
      .map((d) => {
        if (d.ext === ".md") {
          return `/${d.key}/`;
        }
        const name = d.specifier.replace("./", "/");
        return name;
      })
      .join("\n");
  }
}

/**
 * @param {{ content: string, filePath: string, fs: import("@parcel/fs").FileSystem }} param0
 */
async function parseSitemapContent({ content, filePath, fs }) {
  const baseDir = path.dirname(filePath);

  const lines = content
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean)
    .map(async (l) => {
      const fullPath = path.resolve(baseDir, l);

      if (isGlob(l)) {
        const normalized = normalizeSeparators(fullPath);
        return await glob(normalized, fs, { onlyFiles: true });
      }

      return fullPath;
    });

  const all = await Promise.all(lines);
  return new Sitemap(baseDir, all.flat());
}

exports._parseSitemapContent = parseSitemapContent;

/**
 * @param {import("@parcel/types").MutableAsset} asset
 * @param {import("@parcel/fs").FileSystem} fs
 * @returns
 */
exports.parseSitemap = async function (asset, fs) {
  const content = await asset.getCode();
  return parseSitemapContent({ content, filePath: asset.filePath, fs });
};
