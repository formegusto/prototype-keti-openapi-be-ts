import { model, Schema } from "mongoose";
import { ClusteringHousehold, ClusteringInfo } from "./types";

const clusterInfoSchema = new Schema<ClusteringInfo>({
  date: { type: String, required: true },
  label: { type: Number, required: true },
});
const schema = new Schema<ClusteringHousehold>(
  {
    uid: { type: String, required: true },
    season: { type: String, required: true },
    K: { type: Number, required: true },
    tss: { type: Number, required: true },
    wss: { type: Number, required: true },
    ecv: { type: Number, required: true },
    cdpv: { type: Number, required: true },
    info: [clusterInfoSchema],
  },
  {
    collection: "cluster_info",
  }
);

const ClusterPatternModel = model("cluster_info", schema);

export default ClusterPatternModel;
