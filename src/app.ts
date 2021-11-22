import express from "express";

const app: express.Application = express();

app.get("/", (req, res, next) => {
  res.send("hello typescript express");
});

app.listen(3000, () => {
  console.log("server start");
});

export default app;
