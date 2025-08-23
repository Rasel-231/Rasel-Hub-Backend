import { Server } from "http";
import config from "./config";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
async function database() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database Connection Successfull");

    server = app.listen(config.port, () => {
      console.log(`Applications listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Database Connection Error", err);
  }
}
database();
