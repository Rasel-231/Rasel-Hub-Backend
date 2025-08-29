import { model, Schema } from "mongoose";
import { IDemoModel, IModel } from "./interface";

const blogSchema = new Schema<IDemoModel>(
  {
    title: { type: String, required: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const BlogModel = model<IDemoModel, IModel>("Blog", blogSchema);
