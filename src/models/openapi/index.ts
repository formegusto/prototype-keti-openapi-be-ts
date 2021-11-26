import {
  Association,
  DataTypes,
  Model,
  ModelAttributes,
  Sequelize,
} from "sequelize";
import ApiGroupModel from "../apiGroup";
import UserModel from "../user";
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
  public readonly apiGroup?: ApiGroupModel;
  public readonly users?: UserModel[];
  public static associations: {
    apiGroup: Association<OpenapiModel, ApiGroupModel>;
    users: Association<OpenapiModel, UserModel>;
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
      through: "UserOpenapi",
    });
  }
}

export default OpenapiModel;
