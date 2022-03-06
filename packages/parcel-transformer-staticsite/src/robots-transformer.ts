import { createParallelDependency } from "./dep";
import { computeKey } from "./key-factory";
import { parseRobots } from "./robots";
import { StaticSiteTransformerFn } from "./StaticSiteTransformer";

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
