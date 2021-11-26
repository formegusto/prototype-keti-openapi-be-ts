import bcrypt from "bcrypt";

export default async function convertHash<T = any>(
  data: T,
  excepts: string[] = []
) {
  const _: { [key: string]: string } = {};

  for (var [key, value] of Object.entries(data)) {
    if (!excepts.includes(key)) _[key] = await bcrypt.hash(value, 12);
    else _[key] = value;

    // hasHashArray.push(await bcrypt.hash())
  }

  return _;
}
