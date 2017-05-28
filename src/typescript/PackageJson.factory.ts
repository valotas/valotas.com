
export interface PackageJson {
  version: string;
  name: string;
}

export function createPackageJson(pkg: any): PackageJson {
  return {
    name: pkg.name,
    version: pkg.version
  };
}
