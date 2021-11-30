import { Optional } from "sequelize/types";

enum HTTPMETHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type OpenapiAttributes = {
  readonly id?: number;
  name: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  method: HTTPMETHODS;
  restUri: string;
  fullRequest: string;
  apiGroupId: number;
};

interface OpenapiCreationAttributes extends Optional<OpenapiAttributes, "id"> {}

export { HTTPMETHODS, OpenapiAttributes, OpenapiCreationAttributes };
