import { Request, Response } from "express";
import {T} from "../libs/types/common"

const shopController: T = {};
shopController.goHome = (req: Request, res: Response) => {
  try {
    res.send("You are on Home Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("You are on Login Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("You are on Signup Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};


export default shopController;