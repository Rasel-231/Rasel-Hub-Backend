"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    category: { type: String, required: true },
    sitename: { type: String, required: true },
}, {
    timestamps: true,
});
exports.UserNameModel = (0, mongoose_1.model)("usernames", userNameSchema);
