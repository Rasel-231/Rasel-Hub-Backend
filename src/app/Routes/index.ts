import express from "express";
import { UserNameRoutes } from "../modules/client/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import demoRoute from "../modules/demo/routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/username",
    route: UserNameRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/demo",
    route: demoRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
