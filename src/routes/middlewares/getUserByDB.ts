import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user";

async function getUserByDB(req: Request, res: Response, next: NextFunction) {
  try {
    const { decodedUser } = req;
    if (!decodedUser) throw new Error("login required");
    else {
      const user = await UserModel.findOne({
        where: {
          username: decodedUser.username,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) {
        throw new Error("Bad User Information");
      }
      req.decodedUser = user;
    }
    return next();
  } catch (err: any) {
    if (err.message == "login required") {
      res.status(401).json({
        message: "로그인을 진행해주세요.",
      });
    } else if (err.message == "Bad User Information") {
      res.status(403).json({
        message: "잘못된 유저정보 입니다.",
      });
    }
  }
}

export default getUserByDB;
