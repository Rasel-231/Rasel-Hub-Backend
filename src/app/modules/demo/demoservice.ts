import { BlogModel } from "./demomodel";

const demodata = async () => {
  const result = await BlogModel.find({});
  return result;
};

export const demoServices = {
  demodata,
};
