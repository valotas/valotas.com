const path = require("path");

/**
 *
 * @param {string} filePath
 * @param {string} ext
 * @returns {{ name: string, ext: string }} an alias to be used for links
 */
function computeKey(filePath, ext) {
  const parsed = path.parse(filePath);
  ext = ext || parsed.ext;
  if (parsed.name !== "index") {
    return { name: parsed.name, ext };
  }
  const newPath = path.resolve(filePath, "..");
  return computeKey(newPath, ext);
}

exports.computeKey = computeKey;
