import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import UserModel from "./user";
import ApiGroupModel from "./apiGroup";
import OpenapiModel from "./openapi";

dotenv.config();

const database = process.env.MYSQL_DBNAME;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const sequelize = new Sequelize(database!, username!, password!, {
  host: host!,
  port: parseInt(port!),
  dialect: "mysql",
});

UserModel.initConfig(sequelize);
ApiGroupModel.initConfig(sequelize);
OpenapiModel.initConfig(sequelize);

UserModel.associationsConfig();
ApiGroupModel.associationsConfig();
OpenapiModel.associationsConfig();

export default sequelize;
