import { Router, Request, Response } from "express";
import loginCheck from "../middlewares/loginCheck";
import * as jwt from "jsonwebtoken";

const UserRouter = Router();

UserRouter.post("/", (req: Request, res: Response, next) => {
  try {
    const token = jwt.sign(
      {
        username: "username",
      },
      "secret",
      {
        expiresIn: "1h",
        issuer: "formegusto",
      }
    );

    return res.status(200).json({
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (err) {}
});

UserRouter.post("/join", (req: Request, res: Response, next) => {
  res.send("user join");
});

UserRouter.get("/check", loginCheck, (req: Request, res: Response, next) => {
  return res.status(200).json({
    message: "U'r Token",
    ...req.decodedUser,
  });
});

export default UserRouter;
