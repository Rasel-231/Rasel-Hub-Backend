"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameServices = void 0;
const user_model_1 = require("./user.model");
const createUser = async (payload) => {
    const result = await user_model_1.UserNameModel.create(payload);
    return result;
};
const getAllUser = async () => {
    const result = await user_model_1.UserNameModel.find({}); // সব user fetch করবে
    return result;
};
const getSingleUser = async (id) => {
    const result = await user_model_1.UserNameModel.findById(id);
    return result;
};
const deleteUser = async (id) => {
    const result = await user_model_1.UserNameModel.findByIdAndDelete(id);
    return result;
};
const updateUser = async (id, payload) => {
    const result = await user_model_1.UserNameModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
exports.UserNameServices = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
