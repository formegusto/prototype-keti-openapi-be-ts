import { Router, Request, Response, NextFunction } from "express";
import ApiGroupModel from "../../models/apiGroup";
import OpenapiModel from "../../models/openapi";
import { ApiGroup, Openapi } from "./types";

const OpenapiRouter = Router();

OpenapiRouter.get(
  "/:groupId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { groupId } = <ApiGroup>req.params;
    const apiGroup = await ApiGroupModel.findByPk(groupId, {
      attributes: [["id", "groupId"], "name", "title"],
      include: [
        {
          association: ApiGroupModel.associations.openapis,
          attributes: ["name", "title", "shortyDescription"],
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
  }
);

OpenapiRouter.get(
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

OpenapiRouter.post(
  "/apply",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default OpenapiRouter;
