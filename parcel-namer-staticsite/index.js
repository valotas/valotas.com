/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Namer } = require("@parcel/plugin");
const path = require("path");

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

exports.default = new Namer({
  name({ bundle, bundleGraph, logger }) {
    if (bundle.type !== "js") {
      return null;
    }

    const mainEntry = getMainEntryAsset({ bundle, bundleGraph });

    if (!mainEntry.meta.templateSource) {
      return null;
    }

    const template = path.parse(mainEntry.meta.templateSource);
    const source = path.parse(bundle.getMainEntry().filePath);

    let name = `${template.name}.${source.name}`;

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
