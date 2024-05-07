import express from "express";
const router = express.Router();
import userController from "./controllers/user.controller";

router.post("/user/login", userController.login);
router.post("/user/login", userController.login);
router.post("/user/detail", userController.verifyAuth);

router.get(
  "/user/detail",
  userController.verifyAuth,
  userController.getUserDetail
);

/** Product */

/** Order */

export default router;
