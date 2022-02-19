import { MetaFileData } from "./types";
import { isArray } from "./utils";
import { createTitle } from "./titleFactory";

export interface PageState {
  meta: MetaFileData | MetaFileData[];
  title: string;
  path: string;
}

export function createPageState(
  meta: MetaFileData | MetaFileData[]
): PageState {
  return {
    meta,
    title: createTitle(meta),
    path: createPath(meta),
  };
}

function createPath(meta: MetaFileData | MetaFileData[]) {
  if (!isArray(meta)) {
    return `/${meta.path}/`;
  }
  return "/";
}
