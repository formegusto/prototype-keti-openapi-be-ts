import { Optional } from "sequelize/types";

type OpenapiAttributes = {
  readonly id?: number;
  name: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  restUri: string;
  apiGroupId: number;
};

interface OpenapiCreationAttributes extends Optional<OpenapiAttributes, "id"> {}

export { OpenapiAttributes, OpenapiCreationAttributes };
