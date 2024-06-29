import { createParallelDependency } from "./dep.js";
import { computeKey } from "./key-factory.js";
import { parseRobots } from "./robots.js";
import { StaticSiteTransformerFn } from "./StaticSiteTransformer.js";

export const transformRobots: StaticSiteTransformerFn = async ({ asset }) => {
  const robotsContent = await asset.getCode();
  const robots = parseRobots(robotsContent);

  const sitemap = robots.getSitemap();
  if (sitemap) {
    asset.addDependency(createParallelDependency(sitemap));
  }
  robots.setSitemap("/sitemap.txt");

  asset.setCode(robots.getCode());
  asset.meta.key = computeKey(asset.filePath).name;

  return [asset];
};
