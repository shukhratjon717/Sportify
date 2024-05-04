import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import UserService from "../mdels/User.service";
import { AdminRequest, LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const userService = new UserService();

const shopController: T = {};
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
    // send \ json \ redirect\ end \ render
  } catch (err) {
    console.log("Error, GoHome", err);
    res.redirect("/admin");
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup", err);
    res.redirect("/admin/signup");
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
    res.redirect("/admin/login");
  }
};

shopController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOEMTHING_WENT_WRONG);

    const newUser: UserInput = req.body;
    newUser.userImage = file?.path.replace(/\\/g, "/");
    newUser.userType = UserType.SHOP;
    const result = await userService.processSignup(newUser);
    // TODO: SESSIONS AUTHENTICATION

    req.session.user = result;

    req.session.save(function () {
      res.send(result);
      res.redirect(".admin/product/all");
    });
  } catch (err) {
    console.log("Error, processSignup:1", err);
    const message =
      err instanceof Errors ? err.message : Message.SOEMTHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}); window.location.replace('/admin/logout) </script>`
    );
  }
};

shopController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");

    const input: LoginInput = req.body;
    const result = await userService.processLogin(input);
    // TODO: SESSIONS AUTHENTICATION
    req.session.user = result;
    req.session.save(function () {
      // res.send(result);
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOEMTHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}); window.location.replace('/admin/login) </script>`
    );
  }
};

shopController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout", err);
    res.redirect("/admin");
  }
};

shopController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await userService.getUsers();
    console.log("result:", result);
  } catch (err) {
    console.log("Error: getUsers:", err);
    res.redirect("/admin/login");
  }
};

shopController.updateChosenUser = (req: Request, res: Response) => {
  try {
    console.log("updatechosenUser");
  } catch (err) {
    console.log("Error, updateChosenUser:", err);
    res.redirect("/admin");
  }
};

shopController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.user)
      res.send(`<script> alert("${req.session.user.userNick}) </script>`);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.send(err);
  }
};

shopController.verifyShop = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user?.userType === UserType.SHOP) {
    req.user = req.session.user;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace("/admin/login") </script>`
    );
  }
};

export default shopController;
