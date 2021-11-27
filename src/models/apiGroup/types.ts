import { Optional } from "sequelize/types";
import OpenapiModel from "../openapi";

type ApiGroupAttributes = {
  readonly id?: number;
  name: string;
  title: string;
  openapis?: OpenapiModel[];
};

interface ApiGroupCreationAttributes
  extends Optional<ApiGroupAttributes, "id"> {}

export { ApiGroupAttributes, ApiGroupCreationAttributes };
