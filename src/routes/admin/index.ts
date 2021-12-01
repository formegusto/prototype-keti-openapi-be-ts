import { Router } from "express";
import AdminOpenapiRoutes from "./openapi";
import AdminUserRoutes from "./user";

const AdminRoutes = Router();

AdminRoutes.use("/user", AdminUserRoutes);
AdminRoutes.use("/openapi", AdminOpenapiRoutes);

export default AdminRoutes;
