import express, { urlencoded } from 'express';
import path from "path"
/** ENTRANCE **/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express,urlencoded({extended:true}));
app.use(express.json());


/** SESSIONS**/

/** VIEWS**/
app.set('view', path.join(__dirname, 'views'));
app.set("view engine", "ejs")


/** ROUTERS**/

export default app  