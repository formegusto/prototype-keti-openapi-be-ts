import express from "express";
import morgan from "morgan";
import sequelize from "./models";
import routes from "./routes";
import dotenv from "dotenv";
import ApiTests from "./tests/1.api-tests";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const app: express.Application = express();

sequelize.sync({ force: true }).then(async () => {
  console.log("[sequelize] synchronizing success :)");

  await ApiTests();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, async () => {
  console.log(`[ server start ] : Listening on ${PORT}`);
});

export default app;
