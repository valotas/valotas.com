/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { Resolver } = require("@parcel/plugin");

exports.default = new Resolver({
  async resolve({ options, specifier, dependency }) {
    if (!dependency.resolveFrom.toLowerCase().endsWith(".md")) {
      return null;
    }

    const fs = options.inputFS;

    const file = fs.findAncestorFile(
      [specifier],
      dependency.resolveFrom,
      options.projectRoot,
    );

    if (file) {
      const filePath = await fs.realpath(file);

      return {
        filePath,
        sideEffects: true,
      };
    }

    return null;
  },
});
