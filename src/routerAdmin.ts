import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";


routerAdmin.get("/", shopController.goHome);

routerAdmin.get("/login", shopController.getLogin);

routerAdmin.get("/signup", shopController.getSignup);

export default routerAdmin