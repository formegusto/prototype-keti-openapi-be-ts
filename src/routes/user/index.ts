import { Router, Request, Response } from "express";
import loginCheck from "../middlewares/loginCheck";
import * as jwt from "jsonwebtoken";
import { Join, Login, User } from "./types";
import UserModel from "../../models/user";
import convertHash from "../../utils/convertHash";
import bcrypt from "bcrypt";

const UserRoutes = Router();

UserRoutes.post("/", async (req: Request, res: Response, next) => {
  const { username, password } = <Login>req.body;
  try {
    const user = await UserModel.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(403).json({
        status: false,
        message: "잘못된 로그인 정보 입니다.",
      });
    }

    const validPw = await bcrypt.compare(password, user.password);
    if (!validPw) {
      return res.status(403).json({
        status: false,
        message: "잘못된 로그인 정보 입니다.",
      });
    }

    const _user = <User>user.get({ plain: true });
    delete _user.password;
    const token = jwt.sign(_user, process.env.JWT_SECRET!, {
      expiresIn: "3h",
      issuer: "korea electricity technology institute.",
    });

    return res.status(200).json({
      status: true,
      token: token,
      user: _user,
    });
  } catch (err) {
    return next(err);
  }
});

UserRoutes.post("/join", async (req: Request, res: Response, next) => {
  const joinInfo = <Join>req.body;

  try {
    const isExist = await UserModel.findOne({
      where: {
        username: joinInfo.username,
      },
    });

    if (isExist) {
      return res.status(403).json({
        status: false,
        message: "이미 가입된 계정 입니다.",
      });
    }

    const hashJoin = <Join>await convertHash<Join>(joinInfo, ["username"]);
    const user = await UserModel.create(hashJoin);

    const _user = <User>user.get({ plain: true });
    delete _user.password;

    const token = jwt.sign(_user, process.env.JWT_SECRET!, {
      expiresIn: "3h",
      issuer: "korea electricity technology institute.",
    });

    return res.status(201).json({
      status: true,
      token: token,
      user: _user,
    });
  } catch (err) {
    return next(err);
  }
});

UserRoutes.get("/apis", loginCheck, async (req: Request, res: Response) => {
  const { username } = req.decodedUser!;
  const user = await UserModel.findOne({
    where: {
      username,
    },
    include: [UserModel.associations.apis],
  });

  return res.status(200).json({
    status: true,
    apis: user?.apis,
  });
});

UserRoutes.get("/check", loginCheck, (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    user: {
      ...req.decodedUser,
    },
  });
});

export default UserRoutes;
