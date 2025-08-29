"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoServices = void 0;
const demomodel_1 = require("./demomodel");
const demodata = async () => {
    const result = await demomodel_1.BlogModel.find({});
    return result;
};
exports.demoServices = {
    demodata,
};
