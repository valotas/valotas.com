declare module "js-yaml" {
  export function load(yalm: string): {[x:string]: string;};
  export function dump(object: any): string;
}
