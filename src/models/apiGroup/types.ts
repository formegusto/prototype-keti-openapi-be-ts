import { Optional } from "sequelize/types";

type ApiGroupAttributes = {
  readonly id?: number;
  name: string;
  title: string;
};

interface ApiGroupCreationAttributes
  extends Optional<ApiGroupAttributes, "id"> {}

export { ApiGroupAttributes, ApiGroupCreationAttributes };
