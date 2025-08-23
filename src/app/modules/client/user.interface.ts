import { Document, Model } from "mongoose";

export interface IUserName extends Document {
  username: string;
  password: string;
  phone: number;
  category: string;
  sitename: string;
}

// This is the type for the model itself
export type IUserModel = Model<IUserName>;
