const name = require("./StaticSiteNamer").default;
const { computeKey } = require("./key-factory");

exports.default = name;
exports.computeKey = computeKey;
