import express from "express";
import { sequelize } from "./models";

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const app: express.Application = express();

sequelize.sync({ force: true }).then(() => {
  console.log("[sequelize] synchronizing success :)");
});

app.get("/", (req, res, next) => {
  res.send("hello typescript express");
});

app.listen(PORT, async () => {
  console.log(`[ server start ] : Listening on ${PORT}`);
});

export default app;
