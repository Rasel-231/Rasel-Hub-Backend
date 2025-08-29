import express from "express";
import { demoController } from "./demoController";
const demoRoute = express.Router();
demoRoute.get("/blog", demoController.demodata);

export default demoRoute;
