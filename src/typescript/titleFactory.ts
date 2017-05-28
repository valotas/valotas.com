import { MetaFileData } from './types';
import { VALOTAS, isArray } from './utils';

export function createTitle(meta?: MetaFileData | MetaFileData[]) {
  if (!isArray(meta)) {
    return `${meta.title} - ${VALOTAS}`;
  }
  return `${VALOTAS} - Things to remember | Programming stuff :)`;
}
