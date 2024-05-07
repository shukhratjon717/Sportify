import express from "express";
const router = express.Router();
import userController from "./controllers/user.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";

router.post("/user/login", userController.login);
router.post("/user/login", userController.login);
router.post("/user/detail", userController.verifyAuth);

router.get(
  "/user/detail",
  userController.verifyAuth,
  userController.getUserDetail
);

router.post(
  "/user/update",
  userController.verifyAuth,
  uploader("members").single("userImage"),
  userController.updateUser
);
router.get("/user/top-users", userController.getTopUsers);

/** Product */
router.get("/product/all", productController.getProducts)

/** Order */

export default router;
