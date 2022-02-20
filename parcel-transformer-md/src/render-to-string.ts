import type { RenderPageProps } from "@valotas/valotas.com-frontent/dist/render";

const importPromise = eval(
  `import("@valotas/valotas.com-frontent/dist/render.js")`
) as Promise<typeof import("@valotas/valotas.com-frontent/dist/render")>;

export function renderToString(props: RenderPageProps) {
  return importPromise.then((m: any) => m.render(props));
}
