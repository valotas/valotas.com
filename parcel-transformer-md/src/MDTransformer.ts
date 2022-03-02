import { Transformer } from "@parcel/plugin";
import { compileFile } from "pug";
import * as path from "path";
import { parse } from "@valotas/valotas.com-frontent";
import { render } from "@valotas/valotas.com-frontent/dist/render";

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

    config.addDevDependency({
      specifier: "@valotas/valotas.com-frontent/dist/render",
      resolveFrom: defaultTemplateFilePath,
    });

    return {
      pkgVersion: version,
      pkgName: name,
      defaultTemplate: defaultTemplateFilePath,
    };
  },

  async transform({ asset, config: { defaultTemplate, pkgVersion }, logger }) {
    const code = await asset.getCode();

    const { meta, raw } = parse(code);
    if (meta.draft) {
      logger.info({ message: `Skipping draft: ${asset.filePath}` });
      return [];
    }

    const { body: htmlBody, styles } = await render({
      bodyMarkdown: raw,
      pkgVersion,
      logger: {
        log: (message: string) => logger.info({ message }),
      },
    });

    if (!defaultTemplate) {
      throw new Error(`No temlate defined for ${asset.filePath}`);
    }

    asset.invalidateOnFileChange(defaultTemplate);

    asset.meta.templateSource = defaultTemplate;
    const renderHtml = compileFile(defaultTemplate);
    const html = renderHtml({ ...meta, body: htmlBody, styles });

    if (html.indexOf(styles) < 0) {
      logger.warn({
        message: `Styles have not been rendered for ${asset.filePath}`,
      });
    }

    asset.type = "html";
    asset.setCode(html);

    return [asset];
  },
});
