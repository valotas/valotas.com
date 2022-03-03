import { createParallelDependency } from "./dep";
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

  return [asset];
};
