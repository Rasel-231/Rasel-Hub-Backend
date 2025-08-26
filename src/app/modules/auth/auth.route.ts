import express from "express";
import { authController } from "./auth.controller";
export const router = express.Router();

router.post("/login", authController.authLogin);
router.post("/logout", authController.logout);
router.get("/verify", authController.verifyToken);

export const authRoutes = router;
