import express from "express";
const router = express.Router();
import userController from "./controllers/user.controller";


router.get("/", userController.goHome);

router.get("/login", userController.getLogin);

router.get("/signup", userController.getSignup);

export default router