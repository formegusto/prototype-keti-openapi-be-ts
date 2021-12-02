import { Router, Request, Response } from "express";
import { RequestDocumentModel } from "../../../models/apiDocument";
import { RequestDocumentAttributes } from "../../../models/apiDocument/types";
import OpenapiModel from "../../../models/openapi";
import { DocScopes, DocScopeType } from "./types";

const AdminDocumentRoutes = Router();

AdminDocumentRoutes.patch("/request", async (req: Request, res: Response) => {
  const updateInfo = <RequestDocumentAttributes>req.body;

  console.log(updateInfo);

  Object.keys(updateInfo).forEach((key) => {
    if (!updateInfo[key]) {
      delete updateInfo[key];
    }
  });

  console.log(updateInfo);

  try {
    const updateResult = await RequestDocumentModel.update(updateInfo, {
      where: {
        id: updateInfo.id,
      },
    });

    return res.status(200).json({
      status: true,
      updateDocument: updateResult,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

AdminDocumentRoutes.post(
  "/request/:apiId",
  async (req: Request, res: Response) => {
    const { apiId } = req.params;
    const createInfo = <RequestDocumentAttributes>req.body;

    try {
      const api = await OpenapiModel.findByPk(apiId);
      const scopes: DocScopeType = createInfo.scopes;
      const associationKey = DocScopes[scopes];

      if (api) {
        console.log(associationKey);
        const createKey = "create" + associationKey;
        console.log(createKey);
        const createDocument = await api[createKey](createInfo);
        return res.status(200).json({
          status: true,
          createDocument,
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
);

export default AdminDocumentRoutes;
