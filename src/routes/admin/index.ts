import { Router } from "express";
import AdminDocumentRoutes from "./apiDocument";
import AdminOpenapiRoutes from "./openapi";
import AdminUserRoutes from "./user";

const AdminRoutes = Router();

AdminRoutes.use("/user", AdminUserRoutes);
AdminRoutes.use("/openapi", AdminOpenapiRoutes);
AdminRoutes.use("/doc", AdminDocumentRoutes);

export default AdminRoutes;
