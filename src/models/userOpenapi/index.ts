import { Model, DataTypes, ModelAttributes, Sequelize } from "sequelize";
import { OpenapiStatus, UserOpenapiAttributes } from "./types";

const attributes: ModelAttributes = {
  purpose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  status: {
    type: DataTypes.ENUM(OpenapiStatus.Active, OpenapiStatus.Inactive),
    allowNull: false,
    defaultValue: OpenapiStatus.Inactive,
  },
};

class UserOpenapiModel extends Model implements UserOpenapiAttributes {
  // attributes
  public readonly userId!: number;
  public readonly openapiId!: number;
  public purpose!: string;
  public key!: string;
  public status!: OpenapiStatus;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // config func
  public static initConfig(sequelize: Sequelize) {
    UserOpenapiModel.init(attributes, {
      sequelize,
      modelName: "userOpenapi",
      tableName: "UserOpenapi",
    });
  }
}

export default UserOpenapiModel;
