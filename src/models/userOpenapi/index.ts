import { Model, DataTypes, ModelAttributes, Sequelize } from "sequelize";
import { OpenapiStatus, UserOpenapiAttributes } from "./types";

const attributes: ModelAttributes = {
  status: {
    type: DataTypes.ENUM(OpenapiStatus.Active, OpenapiStatus.Inactive),
    allowNull: false,
    defaultValue: OpenapiStatus.Inactive,
  },
};

class UserOpenapi extends Model implements UserOpenapiAttributes {
  // attributes
  public readonly userId!: number;
  public readonly openapiId!: number;
  public status!: OpenapiStatus;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // config func
  public static initConfig(sequelize: Sequelize) {
    UserOpenapi.init(attributes, {
      sequelize,
      modelName: "userOpenapi",
      tableName: "UserOpenapi",
    });
  }
}

export default UserOpenapi;
