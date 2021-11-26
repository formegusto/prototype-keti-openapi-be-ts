import { Optional } from "sequelize/types";

enum OpenapiStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

type UserOpenapiAttributes = {
  readonly userId: number;
  readonly openapiId: number;
  status: OpenapiStatus;
};

export { OpenapiStatus, UserOpenapiAttributes };
