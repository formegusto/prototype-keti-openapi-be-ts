export type DocScopeType =
  | "header"
  | "path parameter"
  | "query parameter"
  | "status code"
  | "json field";
export enum DocScopes {
  "header" = "RequestHeader",
  "path parameter" = "RequestPathParameter",
  "query parameter" = "RequestQueryParameter",
  "status code" = "ResponseStatusCode",
  "json field" = "ResponseJsonField",
}
