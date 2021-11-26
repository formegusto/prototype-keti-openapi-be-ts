import { Optional } from "sequelize/types";

export type DocumentAttributes = {
  readonly id: number;
  title: string;
  description: string;
  type?: string;
  scopes: string;
  readonly openapiId: number;
};

export interface RequestDocumentAttributes extends DocumentAttributes {
  isRequired: boolean;
}

export interface ResponseDocumentAttributes extends DocumentAttributes {}

export interface RequestDocumentCreationAttributes
  extends Optional<RequestDocumentAttributes, "id"> {}
export interface ResponseDocumentCreationAttributes
  extends Optional<ResponseDocumentAttributes, "id"> {}
