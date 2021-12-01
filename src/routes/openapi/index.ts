import { Router, Request, Response, NextFunction } from "express";
import ApiGroupModel from "../../models/apiGroup";
import OpenapiModel from "../../models/openapi";
import UserModel from "../../models/user";
import loginCheck from "../middlewares/loginCheck";
import { ApiGroup, ApplyOpenapi, Openapi } from "./types";
import url from "url";
import { OpenapiStatus } from "../../models/userOpenapi/types";
import { Includeable } from "sequelize";
import UserOpenapiModel from "../../models/userOpenapi";
import getUserByDB from "../middlewares/getUserByDB";

const OpenapiRoutes = Router();

OpenapiRoutes.get("/", async (req: Request, res: Response) => {
  const apiGroup = await ApiGroupModel.findAll({
    attributes: [["id", "groupId"], "name", "title", "imageUrl"],
    include: [ApiGroupModel.associations.openapis],
  });

  return res.status(200).json({
    status: true,
    apiGroup,
  });
});

OpenapiRoutes.get(
  "/user",
  loginCheck,
  getUserByDB,
  async (req: Request, res: Response) => {
    const { query } = url.parse(req.url, true);
    const applyStatus = [OpenapiStatus.Active];

    if (query["containApply"]) applyStatus.push(OpenapiStatus.Inactive);

    const useApisId = await UserOpenapiModel.findAll({
      where: {
        userId: req.decodedUser?.id,
        status: applyStatus,
      },
      attributes: ["openapiId"],
      raw: true,
    });
    const useApisIdNumbers = useApisId.map((_) => _.openapiId);

    const appendOpenApiInclude: Includeable[] = [];

    if (query["containUser"])
      appendOpenApiInclude.push({
        association: OpenapiModel.associations.users,
        where: {
          id: req.decodedUser?.id,
        },
      });
    if (query["containPathQueryParameter"]) {
      appendOpenApiInclude.push(
        OpenapiModel.associations.requestPathParameters
      );
      appendOpenApiInclude.push(
        OpenapiModel.associations.requestQueryParameters
      );
    }

    const apiGroup = await ApiGroupModel.findAll({
      include: [
        {
          association: ApiGroupModel.associations.openapis,
          where: {
            id: useApisIdNumbers,
          },
          include: appendOpenApiInclude,
        },
      ],
    });
    return res.status(200).json({
      status: 200,
      apiGroup,
    });
  }
);

OpenapiRoutes.get(
  "/user/:apiId",
  loginCheck,
  getUserByDB,
  async (req: Request, res: Response) => {
    const { query } = url.parse(req.url, true);
    const { apiId } = <Openapi>req.params;

    const appendOpenApiInclude: Includeable[] = [];
    if (query["containUser"])
      appendOpenApiInclude.push({
        association: OpenapiModel.associations.users,
        where: {
          id: req.decodedUser?.id,
        },
      });
    if (query["containPathQueryParameter"]) {
      appendOpenApiInclude.push(
        OpenapiModel.associations.requestPathParameters
      );
      appendOpenApiInclude.push(
        OpenapiModel.associations.requestQueryParameters
      );
    }

    const openapi = await OpenapiModel.findByPk(apiId, {
      include: appendOpenApiInclude,
    });

    return res.status(200).json({
      status: 200,
      openapi,
    });
  }
);

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
            attributes: ["id", "name", "title", "shortDescription"],
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
