import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function loginCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const secret = process.env.JWT_SECRET;
    const token = req.headers.authorization;

    if (token == null) {
      throw new Error("login required");
    } else {
      const decoded = jwt.verify(token, secret!);
      req.decodedUser = decoded as any;
    }

    return next();
  } catch (err: any) {
    if (err.message == "login required") {
      res.status(401).json({
        message: "로그인을 진행해주세요.",
      });
    }
  }
}

export default loginCheck;
