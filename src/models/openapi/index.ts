import {
  Association,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  ModelAttributes,
  Sequelize,
} from "sequelize";
import { RequestDocumentModel, ResponseDocumentModel } from "../apiDocument";
import ApiGroupModel from "../apiGroup";
import UserModel from "../user";
import UserOpenapiModel from "../userOpenapi";
import { OpenapiAttributes, OpenapiCreationAttributes } from "./types";

const attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  longDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  restUri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiGroupId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
};

class OpenapiModel
  extends Model<OpenapiAttributes, OpenapiCreationAttributes>
  implements OpenapiAttributes
{
  // attributes
  public readonly id!: number;
  public name!: string;
  public title!: string;
  public shortDescription!: string;
  public longDescription!: string;
  public restUri!: string;
  public apiGroupId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associations
  public getRequestHeaders!: HasManyGetAssociationsMixin<RequestDocumentModel>;
  public setRequestHeaders!: HasManySetAssociationsMixin<
    RequestDocumentModel,
    "id"
  >;
  public createRequestHeader!: HasManyCreateAssociationMixin<RequestDocumentModel>;

  public getRequestPathParameters!: HasManyGetAssociationsMixin<RequestDocumentModel>;
  public setRequestPathParameters!: HasManySetAssociationsMixin<
    RequestDocumentModel,
    "id"
  >;
  public createRequestPathParameter!: HasManyCreateAssociationMixin<RequestDocumentModel>;

  public getRequestQueryParameters!: HasManyGetAssociationsMixin<RequestDocumentModel>;
  public setRequestQueryParameters!: HasManySetAssociationsMixin<
    RequestDocumentModel,
    "id"
  >;
  public createRequestQueryParameter!: HasManyCreateAssociationMixin<RequestDocumentModel>;

  public getResponseStatusCodes!: HasManyGetAssociationsMixin<ResponseDocumentModel>;
  public setResponseStatusCodes!: HasManySetAssociationsMixin<
    ResponseDocumentModel,
    "id"
  >;
  public createResponseStatusCode!: HasManyCreateAssociationMixin<ResponseDocumentModel>;

  public getResponseJsonFields!: HasManyGetAssociationsMixin<ResponseDocumentModel>;
  public setResponseJsonFields!: HasManySetAssociationsMixin<
    ResponseDocumentModel,
    "id"
  >;
  public createResponseJsonField!: HasManyCreateAssociationMixin<ResponseDocumentModel>;

  public readonly apiGroup?: ApiGroupModel;
  public readonly users?: UserModel[];
  public readonly requestHeaders?: RequestDocumentModel[];
  public readonly requestPathParameters?: RequestDocumentModel[];
  public readonly requestQueryParameters?: RequestDocumentModel[];
  public readonly responseStatusCodes?: ResponseDocumentModel[];
  public readonly responseJsonFields?: ResponseDocumentModel[];

  public static associations: {
    apiGroup: Association<OpenapiModel, ApiGroupModel>;
    users: Association<OpenapiModel, UserModel>;
    requestPathParameters: Association<OpenapiModel, RequestDocumentModel>;
    requestHeaders: Association<OpenapiModel, RequestDocumentModel>;
    requestQueryParameters: Association<OpenapiModel, RequestDocumentModel>;
    responseStatusCodes: Association<OpenapiModel, ResponseDocumentModel>;
    responseJsonFields: Association<OpenapiModel, ResponseDocumentModel>;
  };

  // config func
  public static initConfig(sequelize: Sequelize) {
    OpenapiModel.init(attributes, {
      sequelize,
      modelName: "openapi",
      tableName: "Openapi",
    });
  }
  public static associationsConfig() {
    OpenapiModel.belongsTo(ApiGroupModel, {
      targetKey: "id",
      foreignKey: "apiGroupId",
    });
    OpenapiModel.belongsToMany(UserModel, {
      through: UserOpenapiModel,
      as: { singular: "User", plural: "Users" },
      foreignKey: "openapiId",
    });

    OpenapiModel.hasMany(RequestDocumentModel, {
      as: "RequestHeader",
      scope: {
        scopes: "header",
      },
      constraints: false,
    });
    OpenapiModel.hasMany(RequestDocumentModel, {
      as: "RequestPathParameter",
      scope: {
        scopes: "path parameter",
      },
      constraints: false,
    });
    OpenapiModel.hasMany(RequestDocumentModel, {
      as: "RequestQueryParameter",
      scope: {
        scopes: "query parameter",
      },
      constraints: false,
    });

    OpenapiModel.hasMany(ResponseDocumentModel, {
      as: "ResponseStatusCode",
      scope: {
        scopes: "status code",
      },
      constraints: false,
    });
    OpenapiModel.hasMany(ResponseDocumentModel, {
      as: "ResponseJsonField",
      scope: {
        scopes: "json field",
      },
      constraints: false,
    });
  }
}

export default OpenapiModel;
