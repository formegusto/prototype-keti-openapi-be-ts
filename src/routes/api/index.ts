import { Router } from "express";
import ClusterPatternRoutes from "./clusterPattern";
import HouseholdPowerRoutes from "./householdEnergy";

const ApiRoutes = Router();

ApiRoutes.use("/householdPower", HouseholdPowerRoutes);
ApiRoutes.use("/clusterPattern", ClusterPatternRoutes);

export default ApiRoutes;
