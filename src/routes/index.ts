import { Router } from "express";
import AdminRoutes from "./admin";
import OpenapiRoutes from "./openapi";
import UserRoutes from "./user";

const routes = Router();
routes.use("/user", UserRoutes);
routes.use("/openapi", OpenapiRoutes);
routes.use("/admin", AdminRoutes);

export default routes;
