import type { MutableAsset, PluginLogger } from "@parcel/types";
import { Transformer } from "@parcel/plugin";
import { compileFile } from "pug";
import * as path from "path";
import { parse } from "@valotas/valotas.com-frontent";
import { render, renderMany } from "@valotas/valotas.com-frontent/dist/render";

export type MdTrasformerConfig = {
  pkgVersion: string;
  pkgName: string;
  defaultTemplate?: string;
};

async function renderBodyAndHead({
  asset,
  logger,
  config: { pkgVersion },
}: {
  asset: MutableAsset;
  logger: PluginLogger;
  config: MdTrasformerConfig;
}) {
  if (asset.meta.publishedFiles) {
    const items = (asset.meta.publishedFiles as any).map((f: any) => ({
      ...f,
      href: `/${f.key}/`,
    }));

    return renderMany({
      pkgVersion,
      logger: {
        log: (message: string) => logger.info({ message }),
      },
      items,
    });
  }

  const code = await asset.getCode();

  const { draft, raw } = parse(code);
  if (draft) {
    return null;
  }

  return render({
    bodyMarkdown: raw,
    pkgVersion,
    logger: {
      log: (message: string) => logger.info({ message }),
    },
  });
}

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

  async transform({ asset, config, logger }) {
    const page = await renderBodyAndHead({
      asset,
      logger,
      config,
    });

    if (!page) {
      logger.info({ message: `Skipping: ${asset.filePath}` });
      return [];
    }

    const { defaultTemplate } = config;
    if (!defaultTemplate) {
      throw new Error(`No temlate defined for ${asset.filePath}`);
    }

    asset.invalidateOnFileChange(defaultTemplate);

    asset.meta.templateSource = defaultTemplate;
    const renderHtml = compileFile(defaultTemplate);
    const html = renderHtml({
      body: page.body,
      styles: page.styles,
    });

    if (html.indexOf(page.styles) < 0) {
      logger.warn({
        message: `Styles have not been rendered for ${asset.filePath}`,
      });
    }

    asset.type = "html";
    asset.setCode(html);

    return [asset];
  },
});
