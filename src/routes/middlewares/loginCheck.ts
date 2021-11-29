import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../../models/user";

dotenv.config();

async function loginCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const secret = process.env.JWT_SECRET;
    const token = req.headers.authorization;

    if (token == null) {
      throw new Error("login required");
    } else {
      const decoded = jwt.verify(token, secret!);

      // db check
      const result = await UserModel.findOne({
        where: {
          username: (decoded as any).username,
        },
      });
      if (result) {
        req.decodedUser = decoded as any;
      } else {
        throw new Error("invalid token");
      }
    }

    return next();
  } catch (err: any) {
    if (err.message == "login required") {
      res.status(401).json({
        message: "로그인을 진행해주세요.",
      });
    }
    if ((err.message = "invalid token")) {
      res.status(401).json({
        message: "올바르지 않은 토큰입니다.",
      });
    }
  }
}

export default loginCheck;
