import { Router, Request, Response } from "express";
import ApiGroupModel from "../../models/apiGroup";
import OpenapiModel from "../../models/openapi";

const DocumentRoutes = Router();

DocumentRoutes.get("/:groupId", async (req: Request, res: Response) => {
  const { groupId } = req.params;

  try {
    const apiGroups = await ApiGroupModel.findByPk(groupId, {
      include: [
        {
          association: ApiGroupModel.associations.openapis,
          include: [
            OpenapiModel.associations.requestHeaders,
            OpenapiModel.associations.requestPathParameters,
            OpenapiModel.associations.requestQueryParameters,
            OpenapiModel.associations.responseStatusCodes,
            OpenapiModel.associations.responseJsonFields,
          ],
        },
      ],
    });

    return res.status(200).json({
      status: true,
      apiGroups,
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

DocumentRoutes.get("/api/:apiId", async (req: Request, res: Response) => {
  const { apiId } = req.params;

  try {
    const openapi = await OpenapiModel.findByPk(apiId, {
      include: [
        OpenapiModel.associations.requestHeaders,
        OpenapiModel.associations.requestPathParameters,
        OpenapiModel.associations.requestQueryParameters,
        OpenapiModel.associations.responseStatusCodes,
        OpenapiModel.associations.responseJsonFields,
      ],
    });

    return res.status(200).json({
      status: true,
      openapi,
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

export default DocumentRoutes;
