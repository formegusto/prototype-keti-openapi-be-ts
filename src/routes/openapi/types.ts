type ApiGroup = {
  readonly groupId?: number;
  name?: string;
  title?: string;
};

type Openapi = {
  readonly apiId?: number;
  name?: string;
  title?: string;
  shortyDescription?: string;
  longDescription?: string;
  restUri?: string;
  apiGroupId?: number;
};

export { ApiGroup, Openapi };
