const DASHES = /\n?---/;
const NL_SPLIT = /\n/;
const KV_SPLIT = /\n|:/;

export type HeaderMeta = {
  title: string | null;
  date: string | null;
  template: string | null;
  draft: boolean;
  skipIndex: boolean;
  tags: string[];
};

function parseHeader(raw: string): HeaderMeta {
  const lines = raw.trim().split(NL_SPLIT);
  return lines
    .map((line) => {
      const pair = line.split(KV_SPLIT);
      const key = pair.shift();
      return {
        key: (key || "").trim(),
        value: pair.join(":").trim(),
      };
    })
    .reduce(
      (prev, { key, value }) => {
        if (key === "tags") {
          (prev as any)[key] = value
            .split(",")
            .map((v) => v.trim())
            .sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));
          return prev;
        }

        (prev as any)[key] = value;

        // draft property should be a boolean
        if (key === "draft") {
          (prev as any)[key] =
            (value || "").toLowerCase() === "true" ? true : false;
        }

        return prev;
      },
      {
        title: null,
        date: null,
        template: null,
        draft: false,
        skipIndex: false,
        tags: [],
      }
    );
}

export function parse(raw: string) {
  const matches = raw.split(DASHES);

  raw = (matches[2] || matches[0]).trim();

  const head = matches.length > 1 ? matches[1] : "";
  const meta = parseHeader(head);

  const sections = raw.split(/((\n#+|#{2,})[^\n]*\n)/g);

  return { ...meta, raw, description: sections[0] };
}
