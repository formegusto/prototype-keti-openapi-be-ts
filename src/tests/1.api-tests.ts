import ApiGroupModel from "../models/apiGroup";

async function ApiTests() {
  const apiGroup = await ApiGroupModel.create({
    name: "test",
    title: "테스트입니다.",
  });
  console.log(apiGroup.get({ plain: true }));

  const openapi = await apiGroup.createOpenapi({
    name: "test open",
    title: "테스트 오픈입니다.",
    shortDescription: "짧은 글",
    longDescription: "긴긴긴 글",
    restUri: "http://",
  });
  console.log(openapi.get({ plain: true }));

  const openapi_2 = await apiGroup.createOpenapi({
    name: "test open_2",
    title: "테스트 오픈입니다._2",
    shortDescription: "짧은 글_2",
    longDescription: "긴긴긴 글_2",
    restUri: "http://_2",
  });
  console.log(openapi.get({ plain: true }));

  const header = await openapi.createRequestHeader({
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
    title: "households",
    description: "가구들의 목록입니다.",
    type: "STRING[]",
  });
  console.log(jsonField.get({ plain: true }));
}

export default ApiTests;
