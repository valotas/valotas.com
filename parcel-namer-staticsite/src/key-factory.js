const path = require("path");

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
