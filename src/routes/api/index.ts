import { Router } from "express";
import HouseholdPowerRoutes from "./householdEnergy";

const ApiRoutes = Router();

ApiRoutes.use("/householdPower", HouseholdPowerRoutes);

export default ApiRoutes;
