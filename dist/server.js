"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
async function database() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log("Database Connection Successfull");
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Applications listening on port ${config_1.default.port}`);
        });
    }
    catch (err) {
        console.log("Database Connection Error", err);
    }
}
database();
