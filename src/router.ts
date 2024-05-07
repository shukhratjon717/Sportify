import express from "express";
const router = express.Router();
import userController from "./controllers/user.controller";

router.post("/user/login", userController.login);
router.post("/user/login", userController.login);
router.post("/user/detail", userController.verifyAuth);

/** Product */

/** Order */

export default router;
