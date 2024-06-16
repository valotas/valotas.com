import * as path from "path";
import type { Transformer as TransformerOpts } from "@parcel/types";
import { Transformer } from "@parcel/plugin";
import { transformSitemap } from "./sitemap-transformer";
import { transformRobots } from "./robots-transformer";
import { transformMd } from "./md-transformer";
import { transformHtmlBody } from "./htmlbody-transformer";

export type MdTrasformerConfig = {
  pkgVersion: string;
  defaultTemplate?: string;
};

export type StaticSiteTransformerFn =
  TransformerOpts<MdTrasformerConfig>["transform"];

export default new Transformer<MdTrasformerConfig>({
  async loadConfig({ config }) {
    const [pkg, conf] = await Promise.all([
      config.getPackage(),
      config.getConfig(["static-site.json"], {}),
    ]);

    if (!pkg) {
      throw new Error("oups");
    }

    const { version } = pkg;

    if (!conf || !conf.filePath) {
      throw new Error("Could not load static-site.json");
    }

    const { defaultTemplate } = conf?.contents as any;

    const defaultTemplateFilePath = defaultTemplate
      ? path.join(path.dirname(conf?.filePath), defaultTemplate)
      : "";

    if (defaultTemplateFilePath) {
      config.invalidateOnFileChange(defaultTemplateFilePath);
    }

    config.addDevDependency({
      specifier: "@valotas/valotas-frontend/dist/render",
      resolveFrom: defaultTemplateFilePath,
    });

    return {
      pkgVersion: version,
      defaultTemplate: defaultTemplateFilePath,
    };
  },

  async transform(props) {
    const { asset } = props;

    if (asset.type === "htmlbody") {
      return transformHtmlBody(props);
    }

    if (asset.type === "md") {
      return transformMd(props);
    }

    if (asset.type === "meta") {
      return [asset];
    }

    const { base } = path.parse(asset.filePath);

    if (base == "sitemap.txt") {
      return transformSitemap(props);
    }

    if (base == "robots.txt") {
      return transformRobots(props);
    }

    throw new Error(`Could not transform ${asset.type}: ${asset.filePath}`);
  },
});
