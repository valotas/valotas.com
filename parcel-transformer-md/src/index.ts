import { Transformer } from "@parcel/plugin";
import { compileFile } from "pug";
import * as path from "path";
import { parseMD } from "./md-parser";
import { renderToString } from "./render-to-string";
import { __asyncDelegator } from "tslib";

export type MdTrasformerConfig = {
  pkgVersion: string;
  pkgName: string;
  defaultTemplate?: string;
};

export default new Transformer<MdTrasformerConfig>({
  async loadConfig({ config }) {
    const [pkg, conf] = await Promise.all([
      config.getPackage(),
      config.getConfig(["static-site.json"], {}),
    ]);

    if (!pkg) {
      throw new Error("oups");
    }

    const { version, name } = pkg;

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

    return {
      pkgVersion: version,
      pkgName: name,
      defaultTemplate: defaultTemplateFilePath,
    };
  },

  async transform({ asset, config: { defaultTemplate, pkgName, pkgVersion } }) {
    const code = await asset.getCode();

    const { meta, raw } = parseMD(code);
    const htmlBody = await renderToString({ bodyMarkdown: raw, pkgName, pkgVersion });

    if (!defaultTemplate) {
      throw new Error(`No temlate defined for ${asset.filePath}`);
    }

    asset.invalidateOnFileChange(defaultTemplate);
    const renderHtml = compileFile(defaultTemplate);
    const html = renderHtml({ ...meta, body: htmlBody });

    asset.type = "html";
    asset.setCode(html);

    return [asset];
  },
});
