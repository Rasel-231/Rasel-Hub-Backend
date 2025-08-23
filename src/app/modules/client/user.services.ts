import { IUserName } from "./user.interface";
import { UserNameModel } from "./user.model";

const createUser = async (payload: IUserName): Promise<IUserName> => {
  const result = await UserNameModel.create(payload);
  return result;
};
const getAllUser = async (): Promise<IUserName[]> => {
  const result = await UserNameModel.find({}); // সব user fetch করবে
  return result;
};
const getSingleUser = async (id: string): Promise<IUserName | null> => {
  const result = await UserNameModel.findById(id);
  return result;
};
const deleteUser = async (id: string): Promise<IUserName | null> => {
  const result = await UserNameModel.findByIdAndDelete(id);
  return result;
};
const updateUser = async (
  id: string,
  payload: Partial<IUserName>
): Promise<IUserName | null> => {
  const result = await UserNameModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserNameServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
