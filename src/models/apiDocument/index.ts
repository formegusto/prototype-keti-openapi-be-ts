import { Model, DataTypes, ModelAttributes, Sequelize } from "sequelize";
import { DocScopeType } from "../../routes/admin/apiDocument/types";
import {
  RequestDocumentAttributes,
  RequestDocumentCreationAttributes,
  ResponseDocumentAttributes,
  ResponseDocumentCreationAttributes,
} from "./types";

const requestAttributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scopes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
};

const responseAttributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scopes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class RequestDocumentModel
  extends Model<RequestDocumentAttributes, RequestDocumentCreationAttributes>
  implements RequestDocumentAttributes
{
  // attributes
  public readonly id!: number;
  public title!: string;
  public description!: string;
  public type!: string;
  public isRequired!: boolean;
  public scopes!: DocScopeType;
  public readonly openapiId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initConfig(sequelize: Sequelize) {
    RequestDocumentModel.init(requestAttributes, {
      sequelize,
      modelName: "requestDocument",
      tableName: "RequestDocument",
    });
  }
}

class ResponseDocumentModel
  extends Model<ResponseDocumentAttributes, ResponseDocumentCreationAttributes>
  implements ResponseDocumentAttributes
{
  // attributes
  public readonly id!: number;
  public title!: string;
  public description!: string;
  public type!: string;
  public isRequired!: boolean;
  public scopes!: DocScopeType;
  public readonly openapiId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initConfig(sequelize: Sequelize) {
    ResponseDocumentModel.init(responseAttributes, {
      sequelize,
      modelName: "responseDocument",
      tableName: "ResponseDocument",
    });
  }
}

export { RequestDocumentModel, ResponseDocumentModel };
