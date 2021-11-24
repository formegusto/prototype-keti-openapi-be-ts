import express from "express";
import morgan from "morgan";
import { sequelize } from "./models";
import routes from "./routes";

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const app: express.Application = express();

sequelize.sync({ force: true }).then(() => {
  console.log("[sequelize] synchronizing success :)");
});

app.use(morgan("dev"));
app.use(routes);

app.listen(PORT, async () => {
  console.log(`[ server start ] : Listening on ${PORT}`);
});

export default app;
