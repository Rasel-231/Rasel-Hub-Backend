"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/:id", (0, auth_1.auth)(), user_controller_1.UserNameController.getSingleUser);
router.patch("/:id", (0, auth_1.auth)(), (0, validateRequest_1.default)({ body: user_validation_1.userValidationByZod.userUpdateZodSchema }), user_controller_1.UserNameController.updateUser);
router.delete("/:id", (0, auth_1.auth)(), user_controller_1.UserNameController.deleteUser);
router.get("/", (0, auth_1.auth)(), user_controller_1.UserNameController.getAllUser);
router.post("/create-user", (0, auth_1.auth)(), (0, validateRequest_1.default)({ body: user_validation_1.userValidationByZod.userEntryZodSchema }), user_controller_1.UserNameController.createUser);
exports.UserNameRoutes = router;
