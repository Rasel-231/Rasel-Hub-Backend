"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationByZod = exports.userUpdateZodSchema = exports.userEntryZodSchema = void 0;
const zod_1 = require("zod");
// Validate request body directly
exports.userEntryZodSchema = zod_1.z.object({
    username: zod_1.z.string().min(4, "Username is required"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    phone: zod_1.z.string().min(11, "Phone number is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    sitename: zod_1.z.string().min(1, "Sitename is required"),
});
exports.userUpdateZodSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(4).optional(),
    password: zod_1.z
        .string()
        .min(6)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/[0-9]/)
        .optional(),
    phone: zod_1.z.string().min(11).optional(),
    category: zod_1.z.string().min(1).optional(),
    sitename: zod_1.z.string().min(1).optional(),
})
    .refine((data) => !data.username || !data.password || data.username !== data.password, {
    message: "Username and password cannot be the same",
    path: ["password"],
});
exports.userValidationByZod = {
    userEntryZodSchema: exports.userEntryZodSchema,
    userUpdateZodSchema: exports.userUpdateZodSchema,
};
