import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";

/** ENTRANCE **/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** SESSIONS**/

/** VIEWS**/
app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** ROUTERS**/
app.use("/admin", routerAdmin); // BSSR; EJS
app.use("/", router);           // SPA: REACT

export default app;
 