import { Request, Response, Router } from "express";
import ClusterPatternModel from "../../../mongoose/models/clusterPattern";

const ClusterPatternRoutes = Router();

ClusterPatternRoutes.get("/", async (req: Request, res: Response) => {
  let { offset = "1", limit = "10" } = req.query;

  if (offset === "") offset = "1";
  if (limit === "") limit = "10";

  const clusterPattern = await ClusterPatternModel.find({}, null, {
    skip: (parseInt(<string>offset) - 1) * parseInt(<string>limit),
    limit: parseInt(<string>limit),
  });

  return res.status(200).json({
    href: req.protocol + "://" + req.get("host") + req.originalUrl,
    clusterPattern,
  });
});

export default ClusterPatternRoutes;
