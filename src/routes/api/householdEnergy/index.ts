import { Request, Response, Router } from "express";
import HouseholdEnergyModel from "../../../mongoose/models/householdEnergy";
import { CommonQuery } from "../common/types";

const HouseholdPowerRoutes = Router();

HouseholdPowerRoutes.get("/", async (req: Request, res: Response) => {
  const { offset = "1", limit = "10" } = req.query;

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
    householdEnergy,
  });
});

export default HouseholdPowerRoutes;
