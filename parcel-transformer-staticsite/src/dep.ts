import type { DependencyPriority, SpecifierType } from "@parcel/types";

const specifierType: SpecifierType = "commonjs";

const parallel: DependencyPriority = "parallel";
const lazy: DependencyPriority = "lazy";

export function createParallelDependency(specifier: string) {
  return {
    specifier,
    specifierType,
    needsStableName: true,
    priority: parallel,
  };
}

export function createLazyDependency(specifier: string) {
  return {
    specifier,
    specifierType,
    needsStableName: true,
    priority: lazy,
  };
}
