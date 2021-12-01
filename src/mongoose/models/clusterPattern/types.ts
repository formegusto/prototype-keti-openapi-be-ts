type ClusteringInfo = {
  date: string;
  label: number;
};

type ClusteringHousehold = {
  uid: string;
  season: string;
  K: number;
  tss: number;
  wss: number;
  ecv: number;
  cdpv: number;
  info: ClusteringInfo[];
};

export { ClusteringInfo, ClusteringHousehold };
