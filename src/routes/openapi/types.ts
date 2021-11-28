type ApiGroup = {
  readonly groupId?: number;
  name?: string;
  title?: string;
};

type Openapi = {
  readonly apiId?: number;
  name?: string;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  restUri?: string;
  apiGroupId?: number;
};

type ApplyOpenapi = {
  readonly apiId: number;
  purpose: number;
};

export { ApiGroup, Openapi, ApplyOpenapi };
