import { Request, Response } from "express";
import { T } from "../libs/types/common";
import UserService from "../mdels/User.service";
import { LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";

const userService = new UserService();

const shopController: T = {};
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("You are on Home Page");
  } catch (err) {
    console.log("Error, GoHome", err);
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("You are on Signup Page");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("You are on Login Page");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

shopController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");

    const newUser: UserInput = req.body;
    newUser.userType = UserType.SHOP;
    const result = await userService.processSignup(newUser);
    // TODO: SESSIONS AUTHENTICATION
    res.send(result);
  } catch (err) {
    console.log("Error, processSignup", err);
    res.send(err);
  }
};

shopController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");

    const input: LoginInput = req.body;
    const userService = new UserService();
    const result = await userService.processLogin(input);
    // TODO: SESSIONS AUTHENTICATION

    res.send(result);
  } catch (err) {
    console.log("Error, getLogin", err);
    res.send(err);
  }
};

export default shopController;
