const importPromise = eval(
  `import("@valotas/valotas.com-frontent/dist/render.js")`
) as Promise<typeof import("@valotas/valotas.com-frontent/dist/render")>;

export function renderToString(raw: string) {
  return importPromise.then((m: any) => m.render(raw));
}
