/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Resolver } = require("@parcel/plugin");
const path = require("path");

// function createPathRange(start, end) {
//   const paths = [];

//   let current = start;
//   while (current !== end) {
//     current = path.join(current, "..");
//     paths.push(current);
//   }

//   return paths;
// }

exports.default = new Resolver({
  async resolve({ logger, options, specifier, dependency }) {
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
      logger.log({ message: `Resolved '${specifier}' to '${filePath}'` });
      return {
        filePath,
        sideEffects: true,
        // invalidateOnFileCreate: [],
        // invalidateOnFileChange: [],
      };
    }

    return null;
  },
});
