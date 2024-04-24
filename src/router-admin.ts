import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";
import productController from "./controllers/product.controller";

routerAdmin.get("/", shopController.goHome);
routerAdmin
  .get("/login", shopController.getLogin)
  .post("/login", shopController.processLogin);

routerAdmin
  .get("/signup", shopController.getSignup)
  .post("/signup", shopController.processSignup);
routerAdmin.get("/logout", shopController.logout);
routerAdmin.get("/check-me", shopController.checkAuthSession);

/** Product  */
routerAdmin.get(
  "/product/all",
  shopController.verifyShop,
  productController.getAllProducts
);
routerAdmin.post(
  "/product/create",
  shopController.verifyShop,
  productController.createNewProduct
);
routerAdmin.post(
  "/product/:id",
  shopController.verifyShop,
  productController.updateChosenProduct
);

/** User */

export default routerAdmin;
