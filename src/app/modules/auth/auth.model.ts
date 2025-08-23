import mongoose, { Schema } from "mongoose";
import { ILogin } from "./auth.interfaces";
export type UserDocType = ILogin & Document;
const userSchema = new Schema<UserDocType>(
  { userId: { type: String, required: true, unique: true } },
  { timestamps: true }
);

export default mongoose.model<UserDocType>("Admin", userSchema);
