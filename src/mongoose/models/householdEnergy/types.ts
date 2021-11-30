type TimeSlot = {
  time: string;
  power: number;
};

type HouseholdEnergy = {
  uid: string;
  timeslot: TimeSlot[];
};

export { TimeSlot, HouseholdEnergy };
