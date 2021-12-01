import { Request, Response, Router } from "express";
import UserModel from "../../../models/user";
import { OpenapiStatus } from "../../../models/userOpenapi/types";

const AdminUserRoutes = Router();

AdminUserRoutes.get("/", async (req: Request, res: Response) => {
  let { offset = "1", limit = "10" } = req.query;

  try {
    const count = await UserModel.count();
    const users = await UserModel.findAll({
      offset: (parseInt(<string>offset) - 1) * 10,
      limit: parseInt(<string>limit),
    });

    return res.status(200).json({
      status: true,
      count,
      users,
      currentPage: parseInt(<string>offset),
      lastPage: Math.floor((count - 1) / parseInt(<string>limit)) + 1,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

AdminUserRoutes.get("/:userId", async (req: Request, res: Response) => {
  let { userId } = req.params;

  try {
    if (!userId)
      return res.status(500).json({
        status: false,
        message: "잘못된 요청입니다.",
      });

    const user = await UserModel.findByPk(userId, {
      include: [
        {
          association: UserModel.associations.activeApis,
        },
        {
          association: UserModel.associations.inactiveApis,
        },
      ],
    });

    return res.status(200).json({
      status: true,
      user,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

export default AdminUserRoutes;
