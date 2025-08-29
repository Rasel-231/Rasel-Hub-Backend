"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/client/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const routes_1 = __importDefault(require("../modules/demo/routes"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/username",
        route: user_route_1.UserNameRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/demo",
        route: routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
