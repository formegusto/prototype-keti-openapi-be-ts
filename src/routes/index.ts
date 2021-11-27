import { Router } from "express";
import OpenapiRouter from "./openapi";
import UserRouter from "./user";

const routes = Router();
routes.use("/user", UserRouter);
routes.use("/openapi", OpenapiRouter);

export default routes;
