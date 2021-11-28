import { Router } from "express";
import AdminOpenapiRoutes from "./openapi";

const AdminRoutes = Router();

AdminRoutes.use("/openapi", AdminOpenapiRoutes);

export default AdminRoutes;
