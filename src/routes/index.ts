import { Router } from "express";
import UserRouter from "./user";

const routes = Router();
routes.use("/user", UserRouter);

export default routes;
