"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    age: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
