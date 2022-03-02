/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Namer } = require("@parcel/plugin");
const path = require("path");
const { computeKey } = require("./key-factory");

function getMainEntryAsset({ bundle, bundleGraph }) {
  const bundleGroup = bundleGraph.getBundleGroupsContainingBundle(bundle)[0];
  const bundleGroupBundles = bundleGraph.getBundlesInBundleGroup(bundleGroup, {
    includeInline: true,
  });
  const mainBundle = bundleGroupBundles.find((b) =>
    b.getEntryAssets().some((a) => a.id === bundleGroup.entryAssetId)
  );

  return mainBundle.getMainEntry();
}

/**
 *
 * @param {import("@parcel/types").Bundle} bundle
 */
function nameHtml(bundle) {
  if (bundle.type !== "html") {
    return null;
  }

  const asset = bundle.getMainEntry();
  if (asset.meta.key) {
    return `${asset.meta.key}.${bundle.type}`;
  }

  if (asset.meta.name) {
    return asset.meta.name;
  }

  const { ext, name } = computeKey(asset.filePath);

  if (ext === ".md" && asset.meta.templateSource) {
    return `${name}/index.${bundle.type}`;
  }
  return null;
}

/**
 *
 * @param {import("@parcel/types").Bundle} bundle
 */
function nameTxt(bundle) {
  if (bundle.type !== "txt") {
    return null;
  }

  const asset = bundle.getMainEntry();
  const { name } = computeKey(asset.filePath);

  return `${name}.${bundle.type}`;
}

exports.default = new Namer({
  name({ bundle, bundleGraph, logger }) {
    let name = nameTxt(bundle);
    if (name) {
      return name;
    }

    name = nameHtml(bundle);
    if (name) {
      return name;
    }

    if (bundle.type !== "js") {
      return null;
    }

    const mainEntryAsset = getMainEntryAsset({ bundle, bundleGraph });

    if (!mainEntryAsset.meta.templateSource) {
      return null;
    }

    const template = path.parse(mainEntryAsset.meta.templateSource);
    const mainEntry = bundle.getMainEntry();
    if (!mainEntry) {
      return null;
    }
    const source = path.parse(mainEntry.filePath);

    name = `${template.name}.${source.name}`;

    if (!bundle.needsStableName) {
      name += `.${bundle.hashReference}`;
    }

    name += `.js`;

    logger.verbose({
      message: `'${source.base}' referenced in '${template.base}' is named '${name}'`,
    });

    return name;
  },
});
