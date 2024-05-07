import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import { LoginInput, User, UserInput } from "../libs/types/user";
import UserService from "../mdels/User.service";
import Errors from "../libs/Errors";
import moment from "moment";

const userService = new UserService();

const userController: T = {};
userController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");

    const input: UserInput = req.body,
      result: User = await userService.signup(input);
    // TODO: tokens
    console.log(
      `${input.userNick} is registered as a new user at ${moment().format(
        "YYYY-MM-DD HH:MM:ss"
      )}`
    );

    res.json({ user: result });
  } catch (err) {
    console.log("Error, signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
      result = await userService.login(input);
    // TODO: tokens

    console.log(
      `${input.userNick} is logged in at ${moment().format(
        "YYYY-MM-DD HH:MM:ss"
      )}`
    );

    res.json({ user: result });
  } catch (err) {
    console.log("Error, login", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default userController;
