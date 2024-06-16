import { compileFile } from "pug";
import { createTitle } from "@valotas/valotas-frontend";
import { StaticSiteTransformerFn } from "./StaticSiteTransformer";

function getString(obj: object, prop: string) {
  const value = (obj as any)[prop];
  const type = typeof value;
  if (type !== "string") {
    throw new Error(`Expected '${prop}' of type string but got ${type}`);
  }

  return value as string;
}

export const transformHtmlBody: StaticSiteTransformerFn = async ({
  asset,
  config,
  logger,
}) => {
  const { defaultTemplate } = config;
  if (!defaultTemplate) {
    throw new Error(`No temlate defined for ${asset.filePath}`);
  }

  const body = await asset.getCode();

  asset.invalidateOnFileChange(defaultTemplate);
  asset.meta.templateSource = defaultTemplate;
  const renderHtml = compileFile(defaultTemplate);

  const title = getString(asset.meta, "title");
  const styles = getString(asset.meta, "styles");
  const payload = getString(asset.meta, "payload");

  const html = renderHtml({
    title: createTitle(title),
    body,
    styles,
    payload: Buffer.from(payload).toString("base64"),
  });

  if (html.indexOf(styles) < 0) {
    logger.warn({
      message: `Styles have not been rendered for ${asset.filePath}`,
    });
  }

  asset.type = "html";
  asset.setCode(html);

  return [asset];
};
