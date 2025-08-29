import { Model } from "mongoose";

export interface IDemoModel extends Document {
  title: string;
  age: number;
}

export type IModel = Model<IDemoModel>;
