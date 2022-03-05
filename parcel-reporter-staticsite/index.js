/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Reporter } = require("@parcel/plugin");

exports.default = new Reporter({
  report({ event, logger }) {
    if (event.type === "buildSuccess") {
      const bundles = event.bundleGraph.getBundles();
      // bundles.forEach((b) => {
      //   if (b.type === "html") {
      //     logger.log({
      //       message: `✨ Built ${b.displayName} - ${b.name} - ${JSON.stringify(
      //         b.stats
      //       )}`,
      //     });
      //   }
      // });
      logger.info({
        message: `${process.env.FOO} Bundled ${bundles.length} in ${event.buildTime}ms`,
      });
    }
  },
});
