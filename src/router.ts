import express from "express";
const router = express.Router();
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import userController from "./controllers/user.controller";
import orderController from "./controllers/order.controller";

router.get("/user/shop", userController.getShop);
router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.post("/user/logout", userController.verifyAuth, userController.logout);

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
router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  userController.retrieveAuth,
  productController.getProduct
);

/** Order */

router.post(
  "/order/create",
  userController.verifyAuth,
  orderController.createOrder
);

router.get(
  "/order/all",
  userController.verifyAuth,
  orderController.getMyOrders
);

router.post(
  "/order/update",
  userController.verifyAuth,
  orderController.updateOrder
);

export default router;
