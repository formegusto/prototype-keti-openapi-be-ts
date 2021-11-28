import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  Association,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import OpenapiModel from "../openapi";
import UserOpenapiModel from "../userOpenapi";
import { UserAttributes, UserCreationAttributes } from "./types";

const attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  // attributes
  public readonly id!: number;
  public username!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addApi!: BelongsToManyAddAssociationMixin<OpenapiModel, "id">;
  public createApi!: BelongsToManyCreateAssociationMixin<OpenapiModel>;
  public getApis!: BelongsToManyGetAssociationsMixin<OpenapiModel>;

  // assoctiations
  public readonly apis?: OpenapiModel[];
  public static associations: {
    apis: Association<UserModel, OpenapiModel>;
  };

  // config func
  public static initConfig(sequelize: Sequelize) {
    UserModel.init(attributes, {
      sequelize,
      modelName: "user",
      tableName: "Users",
    });
  }
  public static associationsConfig() {
    UserModel.belongsToMany(OpenapiModel, {
      through: UserOpenapiModel,
      as: { singular: "api", plural: "apis" },
      foreignKey: "userId",
    });
  }
}

export default UserModel;
