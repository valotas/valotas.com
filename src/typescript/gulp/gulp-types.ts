import { Article } from '../content/Article';
import { MetaFileData } from '../types';

export interface GulpFile {
  meta: MetaFileData|MetaFileData[];
  html?: string;
  article?: Article;
  contents?: any;
  path: string;
  base: string;
}

export interface Logger {
  log(message?: any, ...optionalParams: any[]): void;
}
