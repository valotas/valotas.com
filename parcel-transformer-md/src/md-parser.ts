const DASHES = /\n?---/;
const NL_SPLIT = /\n/;
const KV_SPLIT = /\n|:/;

export type HeaderMeta = {
  title: string | null,
  date: string | null,
  template: string | null,
  published: string | null 
}

function parseHeader(raw: string): HeaderMeta {
  const lines = raw.trim().split(NL_SPLIT);
  return lines
    .map(line => {
      const pair = line.split(KV_SPLIT);
      const key = pair.shift();
      return {
        key: (key || "").trim(),
        value: pair.join(":").trim()
      };
    })
    .reduce(
      (prev, current) => {
        (prev as any)[current.key] = current.value;
        return prev;
      },
      {
        title: null,
        date: null,
        template: null,
        published: null
      }
    );
}

export function parseMD(raw: string) {
  const matches = raw.split(DASHES);

  raw = matches[2].trim();

  const meta = parseHeader(matches[1]);

  return { meta, raw };
}
