import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../../models/user";
import { ConfirmOpenapi } from "./types";
import OpenapiModel from "../../../models/openapi";
import UserOpenapiModel from "../../../models/userOpenapi";
import { OpenapiStatus } from "../../../models/userOpenapi/types";

const AdminOpenapiRoutes = Router();

AdminOpenapiRoutes.put(
  "/confirm",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, apiId } = <ConfirmOpenapi>req.body;

    try {
      const user = await UserModel.findByPk(userId, {
        attributes: {
          exclude: ["password"],
        },
      });
      const strUser = JSON.stringify(user);
      const strDate = Date.now().toString();
      const strRan = Array.from({ length: 3 })
        .map(() => Math.floor(Math.random() * 10000))
        .join("");
      const key = await bcrypt.hash(strUser + strDate + strRan, 12);

      const api = await UserOpenapiModel.findOne({
        where: {
          userId,
          openapiId: apiId,
        },
      });
      api?.update({
        status: OpenapiStatus.Active,
        key,
      });
    } catch (err) {}
  }
);

export default AdminOpenapiRoutes;
