import { NextFunction, Request, Response } from "express";
import OpenapiModel from "../../models/openapi";
import UserOpenapiModel from "../../models/userOpenapi";
import { OpenapiStatus } from "../../models/userOpenapi/types";

export default async function apiValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.headers["authorization"];
  const path = req.url.split("?")[0];
  const fullPath = `http://${req.headers["host"]}/api${path}`;
  console.log(path);
  console.log(fullPath);

  try {
    const userOpenapi = await UserOpenapiModel.findOne({
      where: {
        key,
      },
    });

    if (userOpenapi) {
      if (userOpenapi.status === OpenapiStatus.Inactive) {
        return res.status(403).json({
          status: false,
          message: "관리자 승인이 되지 않은 API KEY 입니다.",
        });
      }
      const openApi = await OpenapiModel.findByPk(userOpenapi.openapiId);
      if (openApi) {
        if (openApi.restUri !== fullPath) {
          return res.status(403).json({
            status: false,
            message: "올바르지 않은 API KEY 입니다.",
          });
        }
        return next();
      } else {
        return res.status(403).json({
          status: false,
          message: "올바르지 않은 API KEY 입니다.",
        });
      }
    } else {
      return res.status(403).json({
        status: false,
        message: "올바르지 않은 API KEY 입니다.",
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: "서버 에러가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
}
