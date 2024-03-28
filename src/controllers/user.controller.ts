import express, { Request, Response } from "express";
import { T } from "../libs/types/common";

const userController: T = {};
userController.goHome = (req: Request, res: Response) => {
  try {
    res.send("You are on Home Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};

userController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("You are on Login Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};

userController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("You are on Signup Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};


export default userController;