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
      const api = await UserOpenapiModel.findOne({
        where: {
          userId,
          openapiId: apiId,
        },
      });
      api?.update({
        status: OpenapiStatus.Active,
      });

      return res.status(200).json({
        status: true,
        message: "승인 되었습니다.",
      });
    } catch (err: any) {
      return res.status(403).json({
        status: false,
        message: err.message,
      });
    }
  }
);

export default AdminOpenapiRoutes;
