import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";

routerAdmin.get("/", shopController.goHome);
routerAdmin
  .get("/login", shopController.getLogin)
  .post("/login", shopController.processLogin);

routerAdmin
  .get("/signup", shopController.getSignup)
  .post("/signup", shopController.processSignup);

  routerAdmin.get("/logout", shopController.logout)

routerAdmin.get("/check-me", shopController.checkAuthSession)

/** Product  */
/** User */

export default routerAdmin;
