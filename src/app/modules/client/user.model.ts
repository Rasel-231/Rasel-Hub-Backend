import { model, Schema } from "mongoose";
import { IUserModel, IUserName } from "./user.interface";

const userNameSchema = new Schema<IUserName>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    category: { type: String, required: true },
    sitename: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserNameModel = model<IUserName, IUserModel>(
  "usernames",
  userNameSchema
);
