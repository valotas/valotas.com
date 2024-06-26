import * as path from "path";

export function computeKey(
  filePath: string,
  ext?: string,
): { name: string; ext: string } {
  const parsed = path.parse(filePath);
  ext = ext || parsed.ext;
  if (parsed.name !== "index") {
    return { name: parsed.name, ext };
  }
  const newPath = path.resolve(filePath, "..");
  return computeKey(newPath, ext);
}
