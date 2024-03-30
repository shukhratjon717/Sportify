import { Request, Response } from "express";
import { T } from "../libs/types/common";
import UserService from "../mdels/User.service";

const shopController: T = {};
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("You are on Home Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("You are on Login Page");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("You are on Signup Page");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

shopController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    res.send("ProcessLogin Page");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

shopController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    res.send("ProcessSignup Page");
  } catch (err) {
    console.log("Error, processSignup", err);
  }
};

export default shopController;
