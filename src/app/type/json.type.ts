export interface JsonMap {
  [property: string]: string | number | boolean | null | JsonArray | JsonMap;
}
export interface JsonArray extends Array<string | number | boolean | null | JsonArray | JsonMap> {}
export type Json = undefined | JsonMap | JsonArray | string | number | boolean | null;
