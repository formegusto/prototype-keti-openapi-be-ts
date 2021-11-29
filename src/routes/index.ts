import { Router } from "express";
import AdminRoutes from "./admin";
import DocumentRoutes from "./apiDocument";
import OpenapiRoutes from "./openapi";
import UserRoutes from "./user";

const routes = Router();
routes.use("/user", UserRoutes);
routes.use("/openapi", OpenapiRoutes);
routes.use("/admin", AdminRoutes);
routes.use("/document", DocumentRoutes);

export default routes;
