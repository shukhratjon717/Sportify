import UserModel from "../schema/User.model";
import { LoginInput, User, UserInput } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { UserType } from "../libs/enums/user.enum";

class UserService {
  private readonly userModel;

  constructor() {
    this.userModel = UserModel;
  }

  public async processSignup(input: UserInput): Promise<User> {
    const exist = await this.userModel
      .findOne({ userType: UserType.SHOP })
      .exec();
    console.log("exist", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

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

    const isMatch = input.userPassword === user.userPassword;

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.userModel.findById(user._id).exec();
    
  }
}

export default UserService;
