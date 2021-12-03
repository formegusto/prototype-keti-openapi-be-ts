import { Router } from "express";
import AdminRoutes from "./admin";
import ApiRoutes from "./api";
import DocumentRoutes from "./apiDocument";
import apiValidate from "./middlewares/apiValidate";
import OpenapiRoutes from "./openapi";
import UserRoutes from "./user";

const routes = Router();
routes.use("/user", UserRoutes);
routes.use("/openapi", OpenapiRoutes);
routes.use("/admin", AdminRoutes);
routes.use("/document", DocumentRoutes);
routes.use("/api", apiValidate, ApiRoutes);

export default routes;
