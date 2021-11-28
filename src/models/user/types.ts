import { Optional } from "sequelize/types";

interface UserAttributes {
  readonly id?: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export { UserAttributes, UserCreationAttributes };
