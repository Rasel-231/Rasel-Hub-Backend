import express from "express";
import { UserNameRoutes } from "../modules/client/user.route";
import { authRoutes } from "../modules/auth/auth.route";
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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
