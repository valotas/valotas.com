import * as renderToString from 'preact-render-to-string';

export const render = (renderToString as any) as (input: any) => string;
