import { Router, Request, Response, NextFunction } from "express";
import ApiGroupModel from "../../models/apiGroup";
import OpenapiModel from "../../models/openapi";
import UserModel from "../../models/user";
import loginCheck from "../middlewares/loginCheck";
import { ApiGroup, ApplyOpenapi, Openapi } from "./types";

const OpenapiRoutes = Router();

OpenapiRoutes.get(
  "/:groupId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { groupId } = <ApiGroup>req.params;
    try {
      const apiGroup = await ApiGroupModel.findByPk(groupId, {
        attributes: [["id", "groupId"], "name", "title"],
        include: [
          {
            association: ApiGroupModel.associations.openapis,
            attributes: ["name", "title", "shortDescription"],
          },
        ],
      });
      if (!apiGroup) {
        return res.status(404).json({
          status: false,
          message: "올바르지 않은 그룹 아이디 입니다.",
        });
      }

      return res.status(200).json({
        status: true,
        apiGroup,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }
);

OpenapiRoutes.get(
  "/:apiGroupId/:apiId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { apiGroupId, apiId } = <Openapi>req.params;
    const openapi = await OpenapiModel.findOne({
      where: {
        id: apiId,
        apiGroupId,
      },
    });

    if (!openapi) {
      return res.status(404).json({
        status: false,
        message: "올바르지 않은 API ID 입니다.",
      });
    }

    return res.status(200).json({
      status: true,
      openapi,
    });
  }
);

OpenapiRoutes.post(
  "/apply",
  loginCheck,
  async (req: Request, res: Response, next: NextFunction) => {
    const { apiId, purpose } = <ApplyOpenapi>req.body;
    const decodedUser = req.decodedUser;
    try {
      const user = await UserModel.findOne({
        where: {
          username: decodedUser?.username,
        },
      });
      if (!user) {
        throw new Error("Bad User Information.");
      }

      const openapi = await OpenapiModel.findByPk(apiId);
      if (!openapi) {
        throw new Error("Bad Api Information.");
      }

      await user.addApi(openapi, {
        through: {
          purpose,
        },
      });
      return res.status(201).json({
        status: true,
        message: "API 신청이 완료 되었습니다.",
      });
    } catch (err: any) {
      console.log(err.message);
      if (err.message === "Bad User Information.") {
        return res.status(403).json({
          status: false,
          message: "올바르지 않은 유저정보 입니다.",
        });
      }
      if (err.message === "Bad Api Information.") {
        return res.status(403).json({
          status: false,
          message: "올바르지 않은 api 정보 입니다.",
        });
      }
    }
  }
);

export default OpenapiRoutes;
