import { connect } from "mongoose";
import ApiTestTwo from "../tests/2.api-tests";

export default async function mongooseInit(appName: string) {
  const { MONGO_HOST, MONGO_PORT } = process.env;
  const connectURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${appName}`;
  await connect(connectURL);

  console.log("[mongoose] connected :)");

  await ApiTestTwo();
}
