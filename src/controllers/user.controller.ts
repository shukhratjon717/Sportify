import express, { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import {
  ExtendedRequest,
  LoginInput,
  User,
  UserInput,
  UserUpdateInput,
} from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Errors";
import moment from "moment";
import { AUTH_TIMER } from "../libs/config";
import AuthService from "../models/Auth.service";
import UserService from "../models/User.service";

const userService = new UserService();
const authService = new AuthService();

const userController: T = {};

userController.getRestaurant = async (req: Request, res: Response) => {
  try {
    console.log("getRestaurant");
    const result = await userService.getRestaurant();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getRestaurant", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");

    const input: UserInput = req.body,
      result: User = await userService.signup(input);
    const token = await authService.createToken(result);
    // TODO: tokens
    console.log(
      `${input.userNick} is registered as a new user at ${moment().format(
        "YYYY-MM-DD HH:MM:ss"
      )}`
    );
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ user: result, accessToken: token });
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
      result = await userService.login(input),
      token = await authService.createToken(result);

    console.log(
      `${input.userNick} is logged in at ${moment().format(
        "YYYY-MM-DD HH:MM:ss"
      )}`
    );
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ user: result, accessToken: token });
  } catch (err) {
    console.log("Error, login", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("Error, logout:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.getUserDetail = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getUserDetail");
    const result = await userService.getUserDetail(req.user);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getUserDetails:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.updateUser = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateMember");
    const input: UserUpdateInput = req.body;
    if (req.file) input.userImage = req.file.path.replace(/\\/, "/");
    const result = await userService.updateUser(req.user, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.getTopUsers = async (req: Request, res: Response) => {
  try {
    console.log("getTopUsers");
    const result = await userService.getTopUsers();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getTopUsers:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.user = await authService.checkAuth(token);
    if (!req.user)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    next();
  } catch (err) {
    console.log("Error, verifyAuth", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.user = await authService.checkAuth(token);
    next();
  } catch (err) {
    console.log("ERROR, retrieveAuth:", err);
    next();
  }
};

export default userController;
