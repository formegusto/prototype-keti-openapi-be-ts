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

  const header = await openapi.createRequestHeader({
    title: "나는 헤더다!",
    description: "헤더지롱!",
    type: "STRING",
    isRequired: true,
  });
  console.log(header.get({ plain: true }));

  const pathParameter = await openapi.createRequestPathParameter({
    title: "나는 페스파라미터다!",
    description: "페스파라미터지롱!",
    type: "STRING",
    isRequired: true,
  });
  console.log(pathParameter.get({ plain: true }));

  const queryParameter = await openapi.createRequestQueryParameter({
    title: "나는 쿼리파라미터다!",
    description: "쿼리파라미터지롱!",
    type: "STRING",
    isRequired: true,
  });
  console.log(queryParameter.get({ plain: true }));

  const statusCode = await openapi.createResponseStatusCode({
    title: "200",
    description: "성공 시, 나타납니다.",
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
