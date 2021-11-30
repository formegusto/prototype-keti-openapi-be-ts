import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  ModelAttributes,
  Sequelize,
} from "sequelize";
import OpenapiModel from "../openapi";
import { ApiGroupAttributes, ApiGroupCreationAttributes } from "./types";

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
    unique: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

class ApiGroupModel
  extends Model<ApiGroupAttributes, ApiGroupCreationAttributes>
  implements ApiGroupAttributes
{
  // attributes
  public readonly id!: number;
  public name!: string;
  public title!: string;
  public imageUrl!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associations
  public getOpenapis!: HasManyGetAssociationsMixin<OpenapiModel>;
  public setOpenapis!: HasManySetAssociationsMixin<OpenapiModel, "id">;
  public addOpenapi!: HasManyAddAssociationMixin<OpenapiModel, "id">;
  public createOpenapi!: HasManyCreateAssociationMixin<OpenapiModel>;

  public readonly openapis?: OpenapiModel[];
  public static associations: {
    openapis: Association<ApiGroupModel, OpenapiModel>;
  };

  // config func
  public static initConfig(sequelize: Sequelize) {
    ApiGroupModel.init(attributes, {
      sequelize,
      modelName: "apiGroup",
      tableName: "ApiGroup",
    });
  }

  public static associationsConfig() {
    ApiGroupModel.hasMany(OpenapiModel, {
      sourceKey: "id",
      foreignKey: "apiGroupId",
    });
  }
}

export default ApiGroupModel;
