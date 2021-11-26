import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
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
  nickname: {
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
  public nickname!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // assoctiations

  // config func
  public static initConfig(sequelize: Sequelize) {
    UserModel.init(attributes, {
      sequelize,
      modelName: "user",
    });
  }
}

export default UserModel;
