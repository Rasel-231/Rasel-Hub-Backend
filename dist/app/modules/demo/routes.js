"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const demoController_1 = require("./demoController");
const demoRoute = express_1.default.Router();
demoRoute.get("/blog", demoController_1.demoController.demodata);
exports.default = demoRoute;
