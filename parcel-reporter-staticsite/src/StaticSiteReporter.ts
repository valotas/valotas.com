/* eslint-env node */
import { Reporter } from "@parcel/plugin";
import * as chalk from "chalk";
import { createAWSService } from "./AWSService";
import { log } from "./utils";

const aws = createAWSService();

export default new Reporter({
  async report({ event }) {
    if (event.type !== "buildSuccess") {
      return;
    }

    const bundles = event.bundleGraph.getBundles();

    log(`\nUploading ${bundles.length} bundles to ${aws.getPublicUrl()}`);

    const start = Date.now();
    for (const bundle of bundles) {
      const distDir = bundle.target.distDir;
      const filePath = bundle.filePath;
      const { name, contentType, time } = await aws.upload({
        distDir,
        filePath,
      });

      log(chalk.dim(name), `as ${chalk.bold(contentType)}`, `took ${time}ms`);
    }

    log(
      `✨ Uploaded ${bundles.length} bundles in ${Date.now() - start}ms to`,
      chalk.underline(aws.getPublicUrl())
    );
  },
});
