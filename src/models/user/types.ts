import { Optional } from "sequelize/types";

enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

interface UserAttributes {
  readonly id?: number;
  username: string;
  password: string;
  role?: UserRole;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export { UserRole, UserAttributes, UserCreationAttributes };
