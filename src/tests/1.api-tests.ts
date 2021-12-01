import ApiGroupModel from "../models/apiGroup";
import OpenapiModel from "../models/openapi";
import { HTTPMETHODS } from "../models/openapi/types";

async function ApiTests() {
  const apiGroup = await ApiGroupModel.create({
    name: "energy",
    title: "Energy",
    imageUrl: "http://localhost:5000/images/energy.png",
  });
  console.log(apiGroup.get({ plain: true }));
  const apiGroup_2 = await ApiGroupModel.create({
    name: "smart_factory",
    title: "Smart Factory",
    imageUrl: "http://localhost:5000/images/smartfactory.png",
  });
  await ApiGroupModel.create({
    name: "driving",
    title: "Driving",
    imageUrl: "http://localhost:5000/images/driving.png",
  });
  await ApiGroupModel.create({
    name: "vr_ar",
    title: "VR / AR",
    imageUrl: "http://localhost:5000/images/vrar.png",
  });
  await ApiGroupModel.create({
    name: "device",
    title: "Device",
    imageUrl: "http://localhost:5000/images/device.png",
  });

  const openapi = await apiGroup.createOpenapi({
    name: "household energy",
    title: "398가구 1년치 전력 데이터",
    shortDescription: "398가구의 1년치 전력 데이터를 제공합니다.",
    longDescription:
      "398가구의 1년치 전력 데이터를 제공합니다.398가구의 1년치 전력 데이터를 제공합니다.398가구의 1년치 전력 데이터를 제공합니다.398가구의 1년치 전력 데이터를 제공합니다.398가구의 1년치 전력 데이터를 제공합니다.398가구의 1년치 전력 데이터를 제공합니다.398가구의 1년치 전력 데이터를 제공합니다.398가구의 1년치 전력 데이터를 제공합니다.",
    method: HTTPMETHODS.GET,
    restUri: "http://localhost:5000/api/householdEnergy",
  });
  console.log(openapi.get({ plain: true }));

  const openapi_2 = await apiGroup.createOpenapi({
    name: "cluster pattern",
    title: "클러스터링 패턴",
    shortDescription:
      "398가구 1년치 전력데이터를 클러스터링 한 정보를 제공합니다.",
    longDescription:
      "398가구의 1년치 전력데이터에 KMeans Clustering Algorithm을 적용시켜, 가구별로 패턴 상 유사도가 높은 전력 패턴끼리의 군집화 데이터 입니다.",
    method: HTTPMETHODS.GET,
    restUri: "http://localhost:5000/api/clusterPattern",
  });
  console.log(openapi.get({ plain: true }));

  const openapi_3 = await apiGroup_2.createOpenapi({
    name: "test open_3",
    title: "테스트 오픈입니다._3",
    shortDescription: "짧은 글_3",
    longDescription: "긴긴긴 글_3",
    method: HTTPMETHODS.GET,
    restUri: "http://_3",
  });

  const openapi_4 = await apiGroup_2.createOpenapi({
    name: "test open_4",
    title: "테스트 오픈입니다._4",
    shortDescription: "짧은 글_4",
    longDescription: "긴긴긴 글_4",
    method: HTTPMETHODS.GET,
    restUri: "http://_4",
  });

  const header = await openapi.createRequestHeader({
    title: "Authorization",
    description: "발급받은 키를 넣어주시면 됩니다.",
    type: "STRING",
    isRequired: true,
  });
  console.log(header.get({ plain: true }));

  await openapi_2.createRequestHeader({
    title: "Authorization",
    description: "발급받은 키를 넣어주시면 됩니다.",
    type: "STRING",
    isRequired: true,
  });
  console.log(header.get({ plain: true }));

  const pathParameter = await openapi.createRequestPathParameter({
    title: "id",
    description: "특정 가구를 조회합니다.",
    type: "STRING",
    isRequired: false,
  });
  console.log(pathParameter.get({ plain: true }));

  const queryParameter = await openapi.createRequestQueryParameter({
    title: "limit",
    description: "몇 개의 데이터를 가지고 올 것인지 정의합니다.",
    type: "NUMBER",
    isRequired: false,
  });
  console.log(queryParameter.get({ plain: true }));

  const queryParameter_2 = await openapi.createRequestQueryParameter({
    title: "offset",
    description: "몇 번째 페이지를 가지고 올 것인지 정의합니다.",
    type: "NUMBER",
    isRequired: false,
  });
  console.log(queryParameter_2.get({ plain: true }));

  const statusCode = await openapi.createResponseStatusCode({
    title: "200",
    description: "요청 성공 코드입니다.",
  });
  console.log(statusCode.get({ plain: true }));

  const jsonField = await openapi.createResponseJsonField({
    title: "householdEnergy",
    description: "가구들의 목록입니다.",
    type: "HouseholdEnergy[]",
  });
  console.log(jsonField.get({ plain: true }));

  await openapi_2.createRequestQueryParameter({
    title: "limit",
    description: "몇 개의 데이터를 가지고 올 것인지 정의합니다.",
    type: "NUMBER",
    isRequired: false,
  });
  console.log(queryParameter.get({ plain: true }));

  await openapi_2.createRequestQueryParameter({
    title: "offset",
    description: "몇 번째 페이지를 가지고 올 것인지 정의합니다.",
    type: "NUMBER",
    isRequired: false,
  });
  console.log(queryParameter_2.get({ plain: true }));

  await openapi_2.createResponseStatusCode({
    title: "200",
    description: "요청 성공 코드입니다.",
  });
  console.log(statusCode.get({ plain: true }));

  const getTest = await OpenapiModel.findByPk(1);
  console.log(getTest?.get({ plain: true }));
}

export default ApiTests;
