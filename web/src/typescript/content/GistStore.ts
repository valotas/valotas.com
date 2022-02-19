import { MetaFileData, Fetcher, GistDescription } from "../types";
import { isValidMetaFile } from "./MetaFile";
import { MetaFileStore } from "./MetaFileStore";

export class GistStore {
  constructor(
    public fetcher: Fetcher,
    metafileStore: MetaFileStore,
    public meta?: MetaFileData
  ) {
    if (!metafileStore) {
      return;
    }
    metafileStore.onChange((current) => {
      this.meta = isValidMetaFile(current) ? current : null;
    });
  }

  /**
   * Should either return the gist content found within the current metafile or
   * load it, save it in the current meta and return a promise of the content
   */
  load(input: GistDescription): string | Promise<string> {
    const gist = this.filterMeta(input);
    if (gist) {
      return gist.content;
    }
    const url = this.createUrl(input);
    return this._load(url).then((content) => {
      this.meta.gists.push({
        content: content,
        gistId: input.gistId,
        file: input.file,
        user: input.user,
      });
      return content;
    });
  }

  private filterMeta(input: GistDescription) {
    const { gists } = this.meta;
    if (!gists) {
      return null;
    }
    const filtered = gists.filter(
      (gist) => gist.gistId === input.gistId && gist.file === input.file
    );
    return filtered.length === 0 ? null : filtered[0];
  }

  private createUrl(input: GistDescription) {
    const user = input.user || "valotas";
    return `https://gist.githubusercontent.com/${user}/${input.gistId}/raw/${input.file}`;
  }

  _load(url: string) {
    return this.fetcher.fetch(url).then((body) => body.text());
  }
}
