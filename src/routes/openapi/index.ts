import { Router, Request, Response, NextFunction } from "express";

const OpenapiRouter = Router();

OpenapiRouter.get(
  "/:groupId",
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({});
  }
);
