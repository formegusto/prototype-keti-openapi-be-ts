import { model, Schema } from "mongoose";
import { HouseholdEnergy, TimeSlot } from "./types";

const timeslotSchema = new Schema<TimeSlot>({
  time: { type: String, require: true },
  power: { type: Number, require: true },
});

const schema = new Schema<HouseholdEnergy>(
  {
    uid: { type: String, required: true },
    timeslot: [timeslotSchema],
  },
  {
    collection: "household_info",
    autoCreate: false,
  }
);

const HouseholdEnergyModel = model<HouseholdEnergy>("household_info", schema);

export default HouseholdEnergyModel;
