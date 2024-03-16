import express from "express";
import * as UserController from "../controllers/UserController.js";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/sign-up", UserController.createUserController);
router.post("/sign-in", UserController.signInUserController);
router.put(
  "/update-user/:id",
  authUserMiddleware,
  UserController.updateUserController
);
router.delete(
  "/delete-user/:id",
  authMiddleware,
  UserController.deleteUserController
);
router.get("/getall-user", authMiddleware, UserController.getAllUserController);
router.get(
  "/getdetail-user/:id",
  authUserMiddleware,
  UserController.getDetailUserController
);
router.post("/refresh-token", UserController.refreshToken);
router.post("/logout", UserController.logout);

// module.exports = router;
export default router;
