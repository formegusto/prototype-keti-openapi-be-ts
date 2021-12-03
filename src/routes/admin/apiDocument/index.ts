import { Router, Request, Response } from "express";
import {
  RequestDocumentModel,
  ResponseDocumentModel,
} from "../../../models/apiDocument";
import {
  RequestDocumentAttributes,
  ResponseDocumentAttributes,
} from "../../../models/apiDocument/types";
import OpenapiModel from "../../../models/openapi";
import { DocScopes, DocScopeType } from "./types";

const AdminDocumentRoutes = Router();

AdminDocumentRoutes.patch("/request", async (req: Request, res: Response) => {
  const updateInfo = <RequestDocumentAttributes>req.body;

  console.log(updateInfo);

  Object.keys(updateInfo).forEach((key) => {
    if (!updateInfo[key]) {
      if (!(typeof updateInfo[key] === "boolean")) delete updateInfo[key];
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
    console.error(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

AdminDocumentRoutes.patch("/response", async (req: Request, res: Response) => {
  const updateInfo = <ResponseDocumentAttributes>req.body;

  console.log(updateInfo);

  Object.keys(updateInfo).forEach((key) => {
    if (!updateInfo[key]) {
      if (!(typeof updateInfo[key] === "boolean")) delete updateInfo[key];
    }
  });

  console.log(updateInfo);

  try {
    const updateResult = await ResponseDocumentModel.update(updateInfo, {
      where: {
        id: updateInfo.id,
      },
    });

    return res.status(200).json({
      status: true,
      updateDocument: updateResult,
    });
  } catch (err: any) {
    console.error(err);
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
      console.error(err);
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
);

AdminDocumentRoutes.post(
  "/response/:apiId",
  async (req: Request, res: Response) => {
    const { apiId } = req.params;
    const createInfo = <ResponseDocumentAttributes>req.body;

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
      console.error(err);
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
);

AdminDocumentRoutes.delete(
  "/request/:documentId",
  async (req: Request, res: Response) => {
    const { documentId } = req.params;

    try {
      const result = await RequestDocumentModel.destroy({
        where: {
          id: documentId,
        },
      });

      return res.status(200).json({
        status: true,
        result,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
);

AdminDocumentRoutes.delete(
  "/response/:documentId",
  async (req: Request, res: Response) => {
    const { documentId } = req.params;

    try {
      const result = await ResponseDocumentModel.destroy({
        where: {
          id: documentId,
        },
      });

      return res.status(200).json({
        status: true,
        result,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
);

export default AdminDocumentRoutes;
