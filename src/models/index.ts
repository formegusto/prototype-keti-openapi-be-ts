import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { UserModel } from "./user";
import User from "./user";

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

class KETIDB {
  User: typeof UserModel;
  constructor() {
    this.User = User(sequelize);
  }
}
const db = new KETIDB();

export { sequelize, db };
