import UserModel from "../schema/User.model";
import {
  LoginInput,
  User,
  UserInput,
  UserUpdateInput,
} from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { UserStatus, UserType } from "../libs/enums/user.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class UserService {
  private readonly userModel;
  static SHOP: UserType | undefined;

  constructor() {
    this.userModel = UserModel;
  }

  /**SPA */

  public async getRestaurant(): Promise<User> {
    const result = await this.userModel
      .findOne({ userType: UserType.SHOP })
      .lean()
      .exec();
    result.target = "Welcome to the Sportify shop ";
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async signup(input: UserInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    input.userPassword = await bcrypt.hash(input.userPassword, salt);

    try {
      const result = await this.userModel.create(input);
      result.userPassword = "";
      return result.toJSON();
    } catch (err) {
      console.log("Error, model:Signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async addUserPoints(user: User, point: number): Promise<User> {
    const userId = shapeIntoMongooseObjectId(user._id);

    return await this.userModel
      .findByIdAndUpdate(
        {
          _id: userId,
          userType: UserType.USER,
          userStstus: UserStatus.ACTIVE,
        },
        { $inc: { userPoints: point } },
        { new: true }
      )
      .exec();
  }

  public async login(input: LoginInput): Promise<User> {
    const user = await this.userModel
      .findOne(
        { userNick: input.userNick, userStatus: { $ne: UserStatus.DELETE } },
        { userNick: 1, userPassword: 1 }
      )
      .exec();

    if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if (user.userStatus === UserStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }

    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    return await this.userModel.findById(user._id).lean().exec();
  }

  public async getUserDetail(user: User): Promise<User> {
    const userId = shapeIntoMongooseObjectId(user._id);
    const result = await this.userModel
      .findOne({ _id: userId, userStatus: UserStatus.ACTIVE })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateUser(user: User, input: UserUpdateInput): Promise<User> {
    const userId = shapeIntoMongooseObjectId(user._id);
    const result = await this.userModel
      .findByIdAndUpdate({ _id: userId }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

  public async getTopUsers(): Promise<User[]> {
    const result = await this.userModel
      .find({
        userStatus: UserStatus.ACTIVE,
        userPoint: { $gte: 1 },
      })
      .sort({ userPoints: -1 })
      .limit(4)
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  /**BSSR */

  public async processSignup(input: UserInput): Promise<User> {
    const exist = await this.userModel
      .findOne({ userType: UserType.SHOP })
      .exec();
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();
    input.userPassword = await bcrypt.hash(input.userPassword, salt);

    try {
      const result = await this.userModel.create(input);
      result.userPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<User> {
    const user = await this.userModel
      .findOne({ userNick: input.userNick }, { userNick: 1, userPassword: 1 })
      .exec();
    if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    // const isMatch = input.userPassword === user.userPassword;

    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    return await this.userModel.findById(user._id).exec();
  }

  public async getUsers(): Promise<User[]> {
    const result = await this.userModel
      .find({ userType: UserType.USER })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: UserUpdateInput): Promise<User> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.userModel
      .findByIdAndUpdate(input._id, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result;
  }
}

export default UserService;
