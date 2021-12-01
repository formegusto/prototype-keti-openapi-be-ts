import { Request, Response, Router } from "express";
import HouseholdEnergyModel from "../../../mongoose/models/householdEnergy";
import { CommonQuery } from "../common/types";

const HouseholdPowerRoutes = Router();

HouseholdPowerRoutes.get("/", async (req: Request, res: Response) => {
  let { offset = "1", limit = "10" } = req.query;

  if (offset === "") offset = "1";
  if (limit === "") limit = "10";

  const householdEnergy = await HouseholdEnergyModel.find(
    {},
    {
      timeslot: {
        $slice: [20, 10],
      },
    },
    {
      skip: (parseInt(<string>offset) - 1) * parseInt(<string>limit),
      limit: parseInt(<string>limit),
    }
  );

  return res.status(200).json({
    href: req.protocol + "://" + req.get("host") + req.originalUrl,
    householdEnergy,
  });
});

export default HouseholdPowerRoutes;
