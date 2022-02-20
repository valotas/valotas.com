import type { PageProps } from "@valotas/valotas.com-frontent";

const importPromise = eval(
  `import("@valotas/valotas.com-frontent/dist/render.js")`
) as Promise<typeof import("@valotas/valotas.com-frontent/dist/render")>;

export function renderToString(props: PageProps) {
  return importPromise.then((m: any) => m.render(props));
}