import HouseholdEnergyModel from "../mongoose/models/householdEnergy";

async function ApiTestTwo() {
  const householdEnergyData = await HouseholdEnergyModel.find({}, null, {
    skip: 10,
    limit: 10,
  });

  console.log("Household Energy data", householdEnergyData);
}

export default ApiTestTwo;
