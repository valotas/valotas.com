interface GulpFile {
  meta: MetaFileData|MetaFileData[];
  html?: string;
  article?: Article;
  contents?: any;
  path: string;
  base: string;
}

interface Directory {
  writeFile(fileName: string, data: string): Promise<string>;
  readFile(fileName: string): Promise<string>;
}

interface Logger {
  log(message?: any, ...optionalParams: any[]): void;
}
