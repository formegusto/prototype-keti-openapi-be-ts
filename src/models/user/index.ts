import { Model, DataTypes, Sequelize } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./types";

const attributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
};

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  // User Attributes
  public id!: number;
  public username!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function User(sequelize: Sequelize): typeof UserModel {
  return UserModel.init(attributes, {
    sequelize,
    modelName: "user",
  });
}
