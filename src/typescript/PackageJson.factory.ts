
export function createPackageJson (pkg: any): PackageJson {
    return {
        name: pkg.name,
        version: pkg.version
    };
}