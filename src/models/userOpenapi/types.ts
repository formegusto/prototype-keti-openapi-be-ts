enum OpenapiStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

type UserOpenapiAttributes = {
  readonly userId: number;
  readonly openapiId: number;
  purpose: string;
  key: string;
  status: OpenapiStatus;
};

export { OpenapiStatus, UserOpenapiAttributes };
