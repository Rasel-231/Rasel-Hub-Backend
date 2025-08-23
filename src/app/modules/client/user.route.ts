import express from "express";
import { UserNameController } from "./user.controller";
import { userValidationByZod } from "./user.validation";
import validateRequest from "../middleware/validateRequest";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/:id", auth(), UserNameController.getSingleUser);
router.patch(
  "/:id",
  auth(),

  validateRequest({ body: userValidationByZod.userUpdateZodSchema }),

  UserNameController.updateUser
);
router.delete("/:id", auth(), UserNameController.deleteUser);
router.get("/", auth(), UserNameController.getAllUser);
router.post(
  "/create-user",
  auth(),

  validateRequest({ body: userValidationByZod.userEntryZodSchema }),
  UserNameController.createUser
);

export const UserNameRoutes = router;
