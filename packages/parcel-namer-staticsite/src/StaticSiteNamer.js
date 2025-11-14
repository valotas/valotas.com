/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { Namer } = require("@parcel/plugin");

function getMainEntryAsset({ bundle, bundleGraph }) {
  const bundleGroup = bundleGraph.getBundleGroupsContainingBundle(bundle)[0];
  const bundleGroupBundles = bundleGraph.getBundlesInBundleGroup(bundleGroup, {
    includeInline: true,
  });
  const mainBundle = bundleGroupBundles.find((b) =>
    b.getEntryAssets().some((a) => a.id === bundleGroup.entryAssetId),
  );

  return mainBundle.getMainEntry();
}

/**
 *
 * @param {import("@parcel/types").Bundle} bundle
 */
function nameHtml(bundle) {
  if (["html", "htmlbody"].indexOf(bundle.type) < 0) {
    return null;
  }

  const asset = bundle.getMainEntry();
  if (!asset) {
    return null;
  }

  // If asset has templateSource and key, use the key-based naming
  if (asset.meta.templateSource) {
    const { key } = asset.meta;

    if (!key) {
      throw new Error(
        `Can not name html asset with templateSource but no meta.key`,
      );
    }

    return key !== "index" ? `${key}/index.html` : "index.html";
  }

  // For HTML assets without templateSource (e.g., static HTML files),
  // If they have a key in meta, use it
  if (asset.meta.key) {
    const { key } = asset.meta;
    return key !== "index" ? `${key}/index.html` : "index.html";
  }

  // For static HTML files without key or templateSource,
  // derive the path from the asset's file path
  // Find "src/" in the path and use everything after it
  const filePath = asset.filePath;
  const srcIndex = filePath.indexOf("/src/");
  if (srcIndex >= 0) {
    return filePath.substring(srcIndex + 5); // +5 to skip "/src/"
  }

  // Fallback: use just the basename
  return path.basename(filePath);
}

/**
 * @param {import("@parcel/types").Bundle} bundle
 */
function nameMeta(bundle) {
  if (bundle.type !== "meta") {
    return null;
  }

  const asset = bundle.getMainEntry();
  const { key } = asset.meta;
  if (!key) {
    throw new Error(`Can not name meta asset without meta.key`);
  }

  return key !== "index" ? `${key}/meta.json` : "meta.json";
}

exports.default = new Namer({
  name({ bundle, bundleGraph, logger }) {
    let name = nameMeta(bundle);
    if (name) {
      return name;
    }

    name = nameHtml(bundle);
    if (name) {
      return name;
    }

    const mainEntry = bundle.getMainEntry();
    if (!mainEntry) {
      return null;
    }

    if (mainEntry.meta.key) {
      return `${mainEntry.meta.key}.${bundle.type}`;
    }

    if (bundle.type !== "js") {
      return null;
    }

    const mainEntryAsset = getMainEntryAsset({ bundle, bundleGraph });

    if (!mainEntryAsset.meta.templateSource) {
      return null;
    }

    const template = path.parse(mainEntryAsset.meta.templateSource);

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
