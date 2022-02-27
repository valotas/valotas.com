const { isGlob, glob, normalizeSeparators } = require("@parcel/utils");
const path = require("path");

class Sitemap {
  constructor(baseDir, rules) {
    /** @type {Array<string>} */
    this._rules = rules;
    this._baseDir = baseDir;
  }

  getDependencies() {
    return this._rules.map((r) => r.replace(this._baseDir, "."));
  }
}

exports.parseSitemap = async function (asset, fs) {
  const content = await asset.getCode();
  const baseDir = path.dirname(asset.filePath);

  const lines = content
    .split("\n")
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
};
