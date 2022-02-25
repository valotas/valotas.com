/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Resolver } = require("@parcel/plugin");
const path = require("path");

exports.default = new Resolver({
  async resolve({ options, specifier, dependency }) {
    if (!dependency.resolveFrom.toLowerCase().endsWith(".md")) {
      return null;
    }

    const file = options.inputFS.findAncestorFile(
      [specifier],
      dependency.resolveFrom,
      options.projectRoot
    );

    if (file) {
      const filePath = await options.inputFS.realpath(file);

      return {
        filePath,
        sideEffects: true,
      };
    }

    return null;
  },
});
